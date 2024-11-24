import { storeToRefs } from "pinia"
import { useModelGroupInfoStore } from "../stores"
import { useRoute } from "vue-router"
import { onMounted, onUnmounted, ref,computed } from "vue"
import { delay_seconds } from "src/helpers/constants"

export function useModelGroupInfo(){

  const modelGroupInfoStore = useModelGroupInfoStore()
  const { modelGroupInfo,isModelGroupInfoFetching,fetchStatus } = storeToRefs(modelGroupInfoStore)

  const route = useRoute()

  const isFirstTimeFetched = ref(false)
  const isFetchSuccess = ref(false)

  const isPageReady = computed(()=>{
    return isFirstTimeFetched.value && isFetchSuccess.value
  })

  const isPageLoading = computed(()=>{
    return !isFirstTimeFetched.value && !isFetchSuccess.value && isModelGroupInfoFetching.value
  })

  const isPageError = computed(()=>{
    return isFirstTimeFetched.value && !isFetchSuccess.value && !isModelGroupInfoFetching.value
  })

  async function getModelGroupInfoHandler(){
    await modelGroupInfoStore.getModelGroupInfo({
      groupId : route.params.modelGroupId
    })
    if(fetchStatus.value){
      isFetchSuccess.value = true
    }
    else{
      isFetchSuccess.value = false
    }
  }


  async function initialFetchHandler(){

    const delay = setTimeout(()=>{
      isFirstTimeFetched.value = false
    },delay_seconds)

    await getModelGroupInfoHandler()

    clearTimeout(delay)
    isFirstTimeFetched.value = true

  }

  function retryHandler(){
    initialFetchHandler()
  }

  onMounted(()=>{
    initialFetchHandler()
  })


  onUnmounted(()=>{
    modelGroupInfoStore.$reset()
  })

  return {
    modelGroupInfo,
    isModelGroupInfoFetching,
    fetchStatus,
    isFirstTimeFetched,
    isPageReady,
    isPageLoading,
    isPageError,
    retryHandler
  }
}
