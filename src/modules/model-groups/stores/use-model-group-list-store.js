import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { fetchModelGroups } from "../services";
import { delay_seconds } from "src/helpers/constants";

export const useModelGroupListStore = defineStore('model-group-list',()=>{

  const modelGroupList = ref([])
  const modelGroupListMaster = ref([])
  const isModelGroupListFetching = ref(false)
  const totalModelGroupListCount = ref(0)
  const fetchStatus = ref(false)

  const currentModelGroupListCount = computed(()=>{
    return modelGroupListMaster.value.length
  })

  async function getModelGroupList({index,size,query}){

    const delay = setTimeout(()=>{
      isModelGroupListFetching.value = true
    },delay_seconds)

    try{
      const modelGroupRes = await fetchModelGroups({
        index : index,
        size : size,
        query : query
      })
      modelGroupListMaster.value = modelGroupRes?.data?.hits?.hits
      totalModelGroupListCount.value = modelGroupRes.data?.hits?.total?.value
      fetchStatus.value = true
    }
    catch(err){
      console.error(err)
      fetchStatus.value = false
    }
    finally{
      clearTimeout(delay)
      isModelGroupListFetching.value = false
    }

  }

  function load(){

    modelGroupList.value = modelGroupListMaster.value.map((val)=>{

      const groupId = val._id
      const groupInfo = val._source

      return {
        groupId : groupId,
        groupName : groupInfo.name,
        groupDescription : groupInfo?.description,
        groupAccessMode : groupInfo?.access,
        version : groupInfo?.latest_version,
        createdAt : new Date(groupInfo?.created_time).toDateString(),
        updatedAt : new Date(groupInfo?.last_updated_time).toDateString()
      }

    })

  }

  function $reset(){
    modelGroupList.value = []
    modelGroupListMaster.value = []
    isModelGroupListFetching.value = false
    totalModelGroupListCount.value = 0
    fetchStatus.value = false
  }

  return {
    modelGroupList,
    modelGroupListMaster,
    isModelGroupListFetching,
    totalModelGroupListCount,
    currentModelGroupListCount,
    fetchStatus,
    getModelGroupList,
    load,
    $reset
  }

})
