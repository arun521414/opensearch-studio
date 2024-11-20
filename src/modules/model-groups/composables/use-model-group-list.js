import { storeToRefs } from "pinia"
import { useModelGroupListStore } from "../stores"
import { computed, onMounted, onUnmounted, ref } from "vue"
import { delay_seconds, table_size_options } from "src/helpers/constants"

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

  const isFetchError = ref(false)
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
      index : index.value,
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

  onMounted(async ()=>{

    const delay = setTimeout(()=>{
      isFirstTimeFetched.value = false
    },delay_seconds)

    pagination.value.size = Number(localStorage.getItem('model_group_table_size')) || table_size_options[0]

    await getModelGroupListHandler()

    clearTimeout(delay)
    isFirstTimeFetched.value = true

  })

  onUnmounted(()=>{
    modelGroupListStore.$reset()
  })

  return {
    searchInput,
    pagination,
    modelGroupList,
    currentModelGroupListCount,
    totalModelGroupListCount,
    rangeOfRecords,
    totalPages,
    isModelGroupListFetching,
    isFetchError,
    isFirstTimeFetched,
    searchInputUpdateHandler,
    pageSizeUpdateHandler,
    paginationUpdateHandler
  }
}
