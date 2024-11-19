<template>
  <q-table row-key="name" :columns="columns" :rows="props.modelGroupList" :loading="props.loading">

  </q-table>
</template>
<script setup>

const props = defineProps({
  modelGroupList: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    required: true
  }
})

</script>
<script>

const columns = [
  {
    name: 'groupId',
    label: 'Group ID',
    field: 'groupId',
    align: 'center'
  },
  {
    name: 'groupName',
    label: 'Group Name',
    field: 'groupName',
    align: 'center'
  }
]

</script>
