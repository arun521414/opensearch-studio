import { defineStore } from "pinia";
import { ref } from "vue";
import { updateModelGroup as modelGroupUpdate } from "../services";
import { delay_seconds } from "src/helpers/constants";

export const useModelGroupEditStore = defineStore('model-group-edit',()=>{

  const modelGroupFormModel = ref({
    name : '',
    description : '',
    access_mode : '',
  })

  const isModelGroupUpdating = ref(false)
  const isModelGroupUpdated = ref(false)

  async function updateModelGroup({groupId}){

    const delay = setTimeout(()=>{
      isModelGroupUpdating.value = true
    },delay_seconds)

    try{

      const groupRes = await modelGroupUpdate({
        groupId:groupId,
        payload : modelGroupFormModel.value
      })

      const status = groupRes.data?.status

      if( status == 'Updated'){
        isModelGroupUpdated.value = true
        return { modelGroupId : groupId }
      }

    }
    catch(err){
      console.error(err)
      isModelGroupUpdated.value = false
      const errorRes = err.response.data
      return { errorMsg : errorRes?.error?.reason}
    }
    finally{
      isModelGroupUpdating.value = false
      clearTimeout(delay)
    }

  }

  function $reset(){
    modelGroupFormModel.value = {
      name : '',
      description :'',
      access_mode : ''
    }
    isModelGroupUpdated.value = false
    isModelGroupUpdating.value = false
  }

  return {
    modelGroupFormModel,
    isModelGroupUpdated,
    isModelGroupUpdating,
    updateModelGroup,
    $reset
  }

})
