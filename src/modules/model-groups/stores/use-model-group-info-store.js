import { defineStore } from "pinia";
import { delay_seconds } from "src/helpers/constants";
import { ref } from "vue";
import { fetchModelGroupInfo } from "../services";

export const useModelGroupInfoStore = defineStore('model-group-info',()=>{

  const modelGroupInfo = ref({})

  const isModelGroupInfoFetching = ref(false)

  const fetchStatus = ref(false)

  async function getModelGroupInfo({groupId}){

    const delay = setTimeout(()=>{
      isModelGroupInfoFetching.value = true
    },delay_seconds)

    try{
      const groupInfoRes = await fetchModelGroupInfo({groupId:groupId})
      modelGroupInfo.value = groupInfoRes.data
      fetchStatus.value = true
    }
    catch(err){
      fetchStatus.value = false
      console.error(err)
    }
    finally{
      clearTimeout(delay)
      isModelGroupInfoFetching.value = false
    }

  }

  function $reset(){
    modelGroupInfo.value = {}
    isModelGroupInfoFetching.value = false
    fetchStatus.value = false
  }

  return {
    modelGroupInfo,
    isModelGroupInfoFetching,
    fetchStatus,
    getModelGroupInfo,
    $reset
  }

})
