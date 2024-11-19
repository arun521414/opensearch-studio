import { api } from "src/boot/axios";


export function fetchModelGroups({index,size,query}){
  return api({
    url : '/_plugins/_ml/model_groups/_search',
    method : 'GET',
    params : {
      from : index,
      size : size,
      query : query
    }
  })
}
