import { storeToRefs } from "pinia"
import { useModelGroupCreateStore } from "../stores"
import { errorNotify, successNotify } from "src/helpers/notify"
import { onUnmounted } from "vue"
import { useRouter } from "vue-router"
import { bus } from "src/helpers/bus"
import { routerBack } from "src/helpers/global-handlers"

export function useModelGroupCreate(){

  const modelGroupCreateStore = useModelGroupCreateStore()
  const { modelGroupFormModel,isModelGroupCreated,isModelGroupCreating } = storeToRefs(modelGroupCreateStore)

  const router = useRouter()

  async function modelGroupCreateHandler(e){

    e?.preventDefault();

    const res = await modelGroupCreateStore.createModelGroup()

    if(isModelGroupCreated.value){
      successNotify('Model group created')
      bus.emit('refresh-model-group-list')
      routerBack({name:'ModelGroupList'})
    }
    else{
      errorNotify(res.errorMsg)
    }

  }

  onUnmounted(()=>{
    modelGroupCreateStore.$reset()
  })

  return {
    modelGroupFormModel,
    isModelGroupCreating,
    modelGroupCreateHandler
  }

}
