import { storeToRefs } from "pinia"
import { useModelGroupEditStore } from "../stores"
import { useRoute } from "vue-router"
import { useModelGroupInfo } from "./use-model-group-info"
import { computed, onUnmounted, watch } from "vue"
import { errorNotify, successNotify } from "src/helpers/notify"
import { routerBack } from "src/helpers/global-handlers"
import { bus } from "src/helpers/bus"

export function useModelGroupEdit(){

  const modelGroupEditStore = useModelGroupEditStore()
  const {modelGroupFormModel,isModelGroupUpdated,isModelGroupUpdating} = storeToRefs(modelGroupEditStore)

  const { modelGroupInfo,isPageLoading,isPageReady,isPageError,retryHandler} = useModelGroupInfo()

  const route = useRoute()

  let dummyForm;

  const isFormEdited = computed(()=>{
    return JSON.stringify(modelGroupFormModel.value) !== dummyForm
  })

  async function updateModelGroupHandler(e){

    e?.preventDefault();

    const res = await modelGroupEditStore.updateModelGroup({
      groupId : route.params.modelGroupId
    })

    if(isModelGroupUpdated.value){
      bus.emit('refresh-model-group-list')
      successNotify('Model group updated')
      routerBack({name:'ModelGroupList'})
    }
    else{
      errorNotify(res?.errorMsg)
    }

  }

  watch(modelGroupInfo,(val)=>{
    modelGroupFormModel.value.name = val?.name
    modelGroupFormModel.value.description = val?.description
    modelGroupFormModel.value.access_mode = val?.access
    dummyForm = JSON.stringify(modelGroupFormModel.value)
  })

  onUnmounted(()=>{
    modelGroupEditStore.$reset()
  })

  return {
    modelGroupFormModel,
    isPageLoading,
    isPageReady,
    isPageError,
    isFormEdited,
    isModelGroupUpdating,
    updateModelGroupHandler,
    retryHandler
  }

}
