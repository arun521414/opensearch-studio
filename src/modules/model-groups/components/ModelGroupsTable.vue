<template>
  <q-table row-key="name" :columns="columns" :rows="props?.modelGroupList" :loading="props?.loading" flat
    hide-pagination bordered class="sticky-header-table">

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
          <q-btn icon="more_vert" flat round dense>
            <q-menu max-width="180px" class="full-width">
              <q-list class="q-py-sm" dense>
                <q-item clickable v-ripple v-for="action in actionOptions" :key="action.name"
                  @click="actionsClickHandler(action.name, props.row)" v-close-popup>
                  <q-item-section side>
                    <q-icon :name="action.icon" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ action.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-td>

      </q-tr>
    </template>

    <template #bottom>
      <slot name="bottom"></slot>
    </template>

    <template #loading>
      <q-inner-loading showing color="primary" size="lg" />
    </template>

  </q-table>
</template>
<script setup>
import { successNotify } from 'src/helpers/notify';
import { copyToClipboard } from 'quasar';
import { useRouter } from 'vue-router';

const router = useRouter()

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

async function actionsClickHandler(actionName, row) {

  if (actionName == 'moreInfo') {
    router.push({ name: 'ModelGroupInfo', params: { modelGroupId: row.groupId } })
  }
  else if (actionName == 'copyGroupId') {
    await copyToClipboard(row.groupId)
    successNotify('group ID copied')
  }
  else if (actionName == 'editGroup') {

  }
  else if (actionName == 'deleteGroup') {

  }

}

</script>
<script>

const columns = [
  {
    name: 'groupId',
    label: 'Group ID',
    field: 'groupId',
    align: 'center',
    headerClasses: 'text-semi-bold text-primary table-header-bg'
  },
  {
    name: 'groupName',
    label: 'Group Name',
    field: 'groupName',
    align: 'center',
    headerClasses: 'text-semi-bold text-primary table-header-bg'
  },
  {
    name: 'groupDescription',
    label: 'Group Description',
    field: 'groupDescription',
    align: 'center',
    headerClasses: 'text-semi-bold text-primary table-header-bg'
  },
  {
    name: 'groupAccessMode',
    label: 'Group Access Mode',
    field: 'groupAccessMode',
    align: 'center',
    headerClasses: 'text-semi-bold text-primary table-header-bg'
  },
  {
    name: 'version',
    label: 'Version',
    field: 'version',
    align: 'center',
    headerClasses: 'text-semi-bold text-primary table-header-bg'
  },
  {
    name: 'createdAt',
    label: 'Created At',
    field: 'createdAt',
    align: 'center',
    headerClasses: 'text-semi-bold text-primary table-header-bg'
  },
  {
    name: 'updatedAt',
    label: 'Updated At',
    field: 'updatedAt',
    align: 'center',
    headerClasses: 'text-semi-bold text-primary table-header-bg'
  },
  {
    name: 'actions',
    label: '',
    field: 'actions',
    align: 'center',
    headerClasses: 'text-semi-bold text-primary table-header-bg'
  }
]


const actionOptions = [
  {
    name: 'moreInfo',
    label: 'More Info',
    icon: 'info'
  },
  {
    name: 'copyGroupId',
    label: 'Copy Group ID',
    icon: 'content_copy'
  },
  {
    name: 'editGroup',
    label: 'Edit Group',
    icon: 'edit'
  },
  {
    name: 'deleteGroup',
    label: 'Delete Group',
    icon: 'delete'
  }
]

</script>
<style lang="sass">

.sticky-header-table
  max-height: calc(100vh - 200px)

thead tr th
  position: sticky
  z-index: 1
thead tr:first-child th
  top: 0

tbody
  scroll-margin-top: 48px

</style>
