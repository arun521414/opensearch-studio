import { delay_seconds } from "src/helpers/constants";
import { ref } from "vue";
import { deleteModelGroup } from "../services";
import { errorNotify, successNotify } from "src/helpers/notify";
import { bus } from "src/helpers/bus";

export function useModelGroupDelete(){

  const selectedModelGroupId = ref(null)
  const selectedModelGroupName = ref('')
  const isdeleteGroupDialogShowing = ref(false)
  const isModelGroupDeleting = ref(false)

  function showDeleteGroupDialog(groupId,groupName){
    selectedModelGroupId.value = groupId
    selectedModelGroupName.value = groupName
    isdeleteGroupDialogShowing.value = true
  }

  function hideDeleteGroupDialog(){
    selectedModelGroupId.value = null
    selectedModelGroupName.value = ''
    isdeleteGroupDialogShowing.value = false
  }

  async function deleteModelGroupHandler(){

    const delay = setTimeout(()=>{
      isModelGroupDeleting.value = true
    },delay_seconds)

    try{

      const deleteRes = await deleteModelGroup({groupId:selectedModelGroupId.value})

      if(deleteRes.data?.result == 'deleted'){
        bus.emit('refresh-model-group-list')
        successNotify('Model group deleted')
      }

    }
    catch(err){

      console.error(err)

      const errorRes = err.response.data

      errorNotify(errorRes?.error?.reason)

    }
    finally{
      clearTimeout(delay)
      isModelGroupDeleting.value = false
      hideDeleteGroupDialog()
    }

  }

  return {
    selectedModelGroupId,
    selectedModelGroupName,
    isdeleteGroupDialogShowing,
    isModelGroupDeleting,
    showDeleteGroupDialog,
    deleteModelGroupHandler,
    hideDeleteGroupDialog
  }

}
