import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchModelGroups } from "../services";

export const useModelGroupListStore = defineStore('model-group-list',()=>{

  const modelGroupList = ref([])
  const modelGroupListMaster = ref([])
  const isModelGroupListFetching = ref(false)
  const fetchStatus = ref(false)

  async function getModelGroupList({index,size,query}){

    isModelGroupListFetching.value = true

    try{
      const modelGroupRes = await fetchModelGroups({
        index : index,
        size : size,
        query : query
      })
      modelGroupListMaster.value = modelGroupRes?.data?.hits?.hits
      fetchStatus.value = true
    }
    catch(err){
      console.error(err)
      fetchStatus.value = false
    }
    finally{
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
        createdAt : groupInfo?.created_time,
        updatedAt : groupInfo?.last_updated_time
      }

    })

  }

  function $reset(){
    modelGroupList.value = []
    modelGroupListMaster.value = []
    isModelGroupListFetching.value = false
    fetchStatus.value = false
  }

  return {
    modelGroupList,
    modelGroupListMaster,
    isModelGroupListFetching,
    fetchStatus,
    getModelGroupList,
    load,
    $reset
  }

})
