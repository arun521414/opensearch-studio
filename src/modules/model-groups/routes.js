
export default {
  path : 'model-groups',
  name : 'ModelGroups',
  component : ()=>import('./pages/ModelGroups.vue'),
  redirect : ()=>{
    return {name:'ModelGroupList'}
  },
  children : [
    {
      path : '',
      name : 'ModelGroupList',
      component : ()=>import('./pages/model-group-list/ModelGroupList.vue'),
      children : [
        {
          path : ':modelGroupId/info',
          name : 'ModelGroupInfo',
          component : ()=>import('./pages/model-group-info/ModelGroupInfo.vue')
        }
      ]
    }
  ]
}
