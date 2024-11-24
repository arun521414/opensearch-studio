import { storeToRefs } from "pinia"
import { useModelGroupListStore } from "../stores"
import { computed, onMounted, onUnmounted, ref } from "vue"
import { delay_seconds, table_size_options } from "src/helpers/constants"
import { bus } from "src/helpers/bus"

export function useModelGroupList(){

  const modelGroupListStore = useModelGroupListStore()
  const {
    modelGroupList,
    modelGroupListMaster,
    isModelGroupListFetching,
    totalModelGroupListCount,
    currentModelGroupListCount,
    fetchStatus
  } = storeToRefs(modelGroupListStore)

  const searchInput = ref('')

  const pagination = ref({
    page : 1,
    size : table_size_options[0]
  })

  const isFetchSuccess = ref(false)
  const isFirstTimeFetched = ref(false)

  const index = computed(()=>{
    return pagination.value.size * ( pagination.value.page - 1)
  })

  const totalPages = computed(()=>{
    return Math.ceil(totalModelGroupListCount.value/pagination.value.size) || 1;
  })

  const rangeOfRecords = computed(()=>{
    return {
      start : (pagination.value.page - 1 ) * pagination.value.size + 1,
      end   : Math.min(pagination.value.page * pagination.value.size,totalModelGroupListCount.value)
    }
  })

  const isPageReady = computed(()=>{
    return isFirstTimeFetched.value && isFetchSuccess.value
  })

  const isPageLoading = computed(()=>{
    return !isFirstTimeFetched.value && !isFetchSuccess.value && isModelGroupListFetching.value
  })

  const isPageError = computed(()=>{
    return isFirstTimeFetched.value && !isFetchSuccess.value && !isModelGroupListFetching.value
  })

  async function getModelGroupListHandler(){

    let query = searchInput.value ? {
      bool : {
        should: [
          {
            multi_match: {
              query: searchInput.value,
              type: "phrase_prefix",
              fields: ["name^4", "description"]
            }
          },
          {
            term: {
              _id: {
                value: searchInput.value
              }
            }
          }
        ]
      }
    } : {
      match_all : {}
    }

    await modelGroupListStore.getModelGroupList({
      index : index.value,
      size : pagination.value.size,
      query : query
    })

    if(fetchStatus.value){
      isFetchSuccess.value = true
      modelGroupListStore.load()
    }
    else{
      isFetchSuccess.value = false
    }

  }

  function refreshHandler(){
    modelGroupListMaster.value = []
    getModelGroupListHandler()
  }

  function searchInputUpdateHandler(){
    pagination.value.page = 1
    refreshHandler()
  }

  function pageSizeUpdateHandler(){
    localStorage.setItem('model_group_table_size',pagination.value.size)
    pagination.value.page = 1
    refreshHandler()
  }

  function paginationUpdateHandler(){
    refreshHandler()
  }

  async function initialFetchHandler(){

    const delay = setTimeout(()=>{
      isFirstTimeFetched.value = false
    },delay_seconds)

    pagination.value.size = Number(localStorage.getItem('model_group_table_size')) || table_size_options[0]

    await getModelGroupListHandler()

    clearTimeout(delay)
    isFirstTimeFetched.value = true

  }

  function retryHandler(){
    initialFetchHandler()
  }

  onMounted(()=>{

    initialFetchHandler()

    bus.on('refresh-model-group-list',()=>{
      refreshHandler()
    })

  })

  onUnmounted(()=>{
    modelGroupListStore.$reset()
    bus.off('refresh-model-group-list')
  })

  return {
    searchInput,
    pagination,
    modelGroupList,
    currentModelGroupListCount,
    totalModelGroupListCount,
    rangeOfRecords,
    isModelGroupListFetching,
    totalPages,
    isPageReady,
    isPageLoading,
    isPageError,
    searchInputUpdateHandler,
    pageSizeUpdateHandler,
    paginationUpdateHandler,
    retryHandler
  }
}
