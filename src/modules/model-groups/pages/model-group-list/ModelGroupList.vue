<template>

  <q-page class="flex flex-center" v-if="isPageLoading">
    <q-spinner color="primary" size="lg" />
  </q-page>


  <q-page class="flex flex-center" v-if="isPageError">
    <div class="text-center q-gutter-y-md">
      <div class="text-h6 text-grey-8">
        <div>Oops,</div>
        <div>Something went wrong.</div>
      </div>
      <div>
        <q-btn icon="refresh" label="Retry" color="primary" rounded unelevated no-caps @click="retryHandler" />
      </div>
    </div>
  </q-page>

  <q-page padding v-if="isPageReady">

    <div class="row justify-between items-center">
      <div class="text-semi-bold text-h6 text-primary">
        Model Groups
      </div>
      <div>
        <q-btn icon="add" label="Create model group" color="primary" rounded unelevated no-caps
          @click="$router.push({ name: 'ModelGroupCreate' })" />
      </div>
    </div>

    <div class="flex flex-center q-pt-sm">
      <q-input v-model="searchInput" @update:model-value="searchInputUpdateHandler"
        label="Search by group ID or name or description" outlined rounded dense style="width: 380px;" debounce="500"
        clearable>
        <template #prepend>
          <q-icon name="search" color="primary" />
        </template>
      </q-input>
    </div>

    <div class="q-py-sm">

      <model-groups-table :loading="isModelGroupListFetching" :model-group-list="modelGroupList"
        @delete-group="showDeleteGroupDialog">

        <template #bottom>
          <div class="row justify-end items-center q-gutter-x-md full-width">
            <div>
              {{ rangeOfRecords.start }} - {{ rangeOfRecords.end }} of {{ totalModelGroupListCount }}
            </div>
            <pagination-size-select v-model="pagination.size" @update:model="pageSizeUpdateHandler" />
            <q-pagination v-model="pagination.page" :max="totalPages" input round
              @update:model-value="paginationUpdateHandler" />
          </div>
        </template>

      </model-groups-table>

    </div>

    <router-view />

  </q-page>

  <q-dialog v-model="isdeleteGroupDialogShowing" no-backdrop-dismiss no-route-dismiss>
    <q-card class="full-width" style="max-width: 420px;">
      <q-card-section>
        <div class="text-primary text-h6 text-center text-semi-bold">
          Delete model group ?
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="text-center text-subtitle1">
          This will delete <span class="text-semi-bold">{{ selectedModelGroupName }}</span>
        </div>
      </q-card-section>
      <q-card-section class="flex justify-around">
        <q-btn label="Cancel" color="primary" rounded outline no-caps unelevated style="width:120px"
          @click="hideDeleteGroupDialog" dense :disable="isModelGroupDeleting" />
        <q-btn icon="delete" label="Delete" color="negative" rounded no-caps unelevated style="width:120px"
          :loading="isModelGroupDeleting" dense @click="deleteModelGroupHandler" />
      </q-card-section>
    </q-card>
  </q-dialog>

</template>
<script setup>
import ModelGroupsTable from '../../components/ModelGroupsTable.vue';
import { useModelGroupList, useModelGroupDelete } from '../../composables';

const {
  searchInput,
  pagination,
  modelGroupList,
  rangeOfRecords,
  totalPages,
  totalModelGroupListCount,
  isModelGroupListFetching,
  isPageLoading,
  isPageReady,
  isPageError,
  searchInputUpdateHandler,
  pageSizeUpdateHandler,
  paginationUpdateHandler,
  retryHandler
} = useModelGroupList()

const {
  selectedModelGroupId,
  selectedModelGroupName,
  isdeleteGroupDialogShowing,
  isModelGroupDeleting,
  showDeleteGroupDialog,
  deleteModelGroupHandler,
  hideDeleteGroupDialog
} = useModelGroupDelete()

</script>
