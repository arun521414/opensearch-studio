import { api } from "src/boot/axios";

export function fetchModelGroups({index,size,query}){
  return api({
    url : '/_plugins/_ml/model_groups/_search',
    method : 'POST',
    data : {
      from : index,
      size : size,
      query : query
    }
  })
}

export function fetchModelGroupInfo({groupId}){
  return api({
    url : `/_plugins/_ml/model_groups/${groupId}`,
    method : 'GET'
  })
}

export function deleteModelGroup({groupId}){
  return api({
    url : `/_plugins/_ml/model_groups/${groupId}`,
    method : 'DELETE'
  })
}

export function createModelGroup({payload}){
  return api({
    url : `/_plugins/_ml/model_groups/_register`,
    method : 'POST',
    data : payload
  })
}

export function updateModelGroup({groupId,payload}){
  return api({
    url : `/_plugins/_ml/model_groups/${groupId}`,
    method : 'PUT',
    data : payload
  })
}



