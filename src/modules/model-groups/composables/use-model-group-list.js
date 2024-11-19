import { storeToRefs } from "pinia"
import { useModelGroupListStore } from "../stores"
import { onMounted, onUnmounted, ref } from "vue"

export function useModelGroupList(){

  const modelGroupListStore = useModelGroupListStore()
  const {
    modelGroupList,
    modelGroupListMaster,
    isModelGroupListFetching,
    fetchStatus
  } = storeToRefs(modelGroupListStore)

  const searchInput = ref('')

  const pagination = ref({
    page : 1,
    size : 10
  })

  const isFetchError = ref(false)

  async function getModelGroupListHandler(){

    let query = searchInput.value ? {
      multi_match : {
        query  : searchInput.value,
        type   : "best_fields",
        fields : ['_id','name','description']
      }
    } : {
      match_all : {}
    }

    await modelGroupListStore.getModelGroupList({
      index : pagination.value.page - 1,
      size : pagination.value.size,
      query : query
    })
    fetchStatus.value ? modelGroupListStore.load() : isFetchError.value = true
  }


  function refreshHandler(){
    modelGroupListMaster.value = []
    getModelGroupListHandler()
  }

  function searchInputUpdateHandler(){
    refreshHandler()
  }

  onMounted(()=>{
    getModelGroupListHandler()
  })

  onUnmounted(()=>{
    modelGroupListStore.$reset()
  })

  return {
    searchInput,
    modelGroupList,
    isModelGroupListFetching,
    searchInputUpdateHandler
  }
}
