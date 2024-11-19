<template>
  <q-table row-key="name" :columns="columns" :rows="props?.modelGroupList" :loading="props?.loading" flat bordered
    hide-pagination no-data-label="No Data Found">
    <template #body="props">
      <q-tr :props="props">
        <q-td :props="props" key="groupId">
          {{ props.row.groupId }}
        </q-td>
        <q-td :props="props" key="groupName">
          {{ props.row.groupName }}
        </q-td>
        <q-td :props="props" key="groupDescription">
          {{ props.row.groupDescription }}
        </q-td>
        <q-td :props="props" key="groupAccessMode">
          {{ props.row.groupAccessMode }}
        </q-td>
        <q-td :props="props" key="version">
          {{ props.row.version }}
        </q-td>
        <q-td :props="props" key="createdAt">
          {{ props.row.createdAt }}
        </q-td>
        <q-td :props="props" key="updatedAt">
          {{ props.row.updatedAt }}
        </q-td>
        <q-td :props="props" key="actions">
          <q-btn icon="more_vert" flat round>
            <q-menu max-width="210px" class="full-width">
              <q-list class="q-py-sm" dense>

                <q-item clickable>
                  <q-item-section avatar>
                    <q-icon name="info" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Group Info</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable>
                  <q-item-section avatar>
                    <q-icon name="edit" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Edit Group</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable>
                  <q-item-section avatar>
                    <q-icon name="delete" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Delete Group</q-item-label>
                  </q-item-section>
                </q-item>

              </q-list>
            </q-menu>
          </q-btn>
        </q-td>
      </q-tr>
    </template>
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
    align: 'center',
    headerClasses: 'text-semi-bold text-primary'
  },
  {
    name: 'groupName',
    label: 'Group Name',
    field: 'groupName',
    align: 'center',
    headerClasses: 'text-semi-bold text-primary'
  },
  {
    name: 'groupDescription',
    label: 'Group Description',
    field: 'groupDescription',
    align: 'center',
    headerClasses: 'text-semi-bold text-primary'
  },
  {
    name: 'groupAccessMode',
    label: 'Group Access Mode',
    field: 'groupAccessMode',
    align: 'center',
    headerClasses: 'text-semi-bold text-primary'
  },
  {
    name: 'version',
    label: 'Version',
    field: 'version',
    align: 'center',
    headerClasses: 'text-semi-bold text-primary'
  },
  {
    name: 'createdAt',
    label: 'Created At',
    field: 'createdAt',
    align: 'center',
    headerClasses: 'text-semi-bold text-primary'
  },
  {
    name: 'updatedAt',
    label: 'Updated At',
    field: 'updatedAt',
    align: 'center',
    headerClasses: 'text-semi-bold text-primary'
  },
  {
    name: 'actions',
    label: '',
    field: 'actions',
    align: 'center',
    headerClasses: 'text-semi-bold text-primary'
  }
]

</script>
