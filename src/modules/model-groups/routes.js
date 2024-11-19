
export default {
  path : 'model-groups',
  name : 'ModelGroups',
  component : ()=>import('./pages/ModelGroups.vue'),
  children : [
    {
      path : '',
      name : 'ModelGroupList',
      component : ()=>import('./pages/model-group-list/ModelGroupList.vue')
    }
  ]
}
