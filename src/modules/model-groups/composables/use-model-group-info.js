import { storeToRefs } from "pinia"
import { useModelGroupInfoStore } from "../stores"
import { useRoute } from "vue-router"
import { onMounted, onUnmounted, ref } from "vue"
import { delay_seconds } from "src/helpers/constants"

export function useModelGroupInfo(){

  const modelGroupInfoStore = useModelGroupInfoStore()
  const { modelGroupInfo,isModelGroupInfoFetching,fetchStatus } = storeToRefs(modelGroupInfoStore)

  const route = useRoute()

  const isFirstTimeFetched = ref(false)

  async function getModelGroupInfoHandler(){
    await modelGroupInfoStore.getModelGroupInfo({
      groupId : route.params.modelGroupId
    })
  }

  onMounted(async ()=>{

    const delay = setTimeout(()=>{
      isFirstTimeFetched.value = false
    },delay_seconds)

    await getModelGroupInfoHandler()

    clearTimeout(delay)
    isFirstTimeFetched.value = true

  })


  onUnmounted(()=>{
    modelGroupInfoStore.$reset()
  })

  return {
    modelGroupInfo,
    isModelGroupInfoFetching,
    fetchStatus,
    isFirstTimeFetched
  }
}
