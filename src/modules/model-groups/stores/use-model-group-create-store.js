import { defineStore } from "pinia";
import { delay_seconds } from "src/helpers/constants";
import { ref } from "vue";
import { createModelGroup as modelGroupCreate } from "../services";

export const useModelGroupCreateStore = defineStore('model-group-create',()=>{

  const modelGroupFormModel = ref({
    name : '',
    description : '',
    access_mode : 'private',
  })

  const isModelGroupCreating = ref(false)
  const isModelGroupCreated = ref(false)

  async function createModelGroup(){

    const delay = setTimeout(()=>{
      isModelGroupCreating.value = true
    },delay_seconds)

    try{

      const groupRes = await modelGroupCreate({
        payload : modelGroupFormModel.value
      })

      const status = groupRes.data?.status
      const modelGroupId = groupRes.data?.model_group_id

      if( status == 'CREATED'){
        isModelGroupCreated.value = true
        return { modelGroupId : modelGroupId }
      }

    }
    catch(err){
      isModelGroupCreated.value = false
      console.error(err)
      const errorRes = err.response.data
      return { errorMsg : errorRes?.error?.reason}
    }
    finally{
      isModelGroupCreating.value = false
      clearTimeout(delay)
    }

  }

  function $reset(){
    modelGroupFormModel.value = {
      name : '',
      description : '',
      access_mode : 'private'
    }
    isModelGroupCreated.value = false
    isModelGroupCreating.value = false
  }


  return {
    modelGroupFormModel,
    isModelGroupCreated,
    isModelGroupCreating,
    createModelGroup,
    $reset
  }

})


