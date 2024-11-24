
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
        },
        {
          path : 'create',
          name : 'ModelGroupCreate',
          component : ()=>import('./pages/model-group-create/ModelGroupCreate.vue')
        },
        {
          path : ':modelGroupId/edit',
          name : 'ModelGroupEdit',
          component : ()=>import('./pages/model-group-edit/ModelGroupEdit.vue')
        }
      ]
    }
  ]
}
