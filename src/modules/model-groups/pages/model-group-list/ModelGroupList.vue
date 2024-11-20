<template>
  <q-page padding v-if="!isFetchError && isFirstTimeFetched">

    <div class="row justify-between items-center">
      <div class="text-semi-bold text-h6 text-primary">
        Model Groups
      </div>
      <div>
        <q-btn icon="add" label="Create Group" color="primary" rounded unelevated no-caps />
      </div>
    </div>

    <div class="flex flex-center">
      <q-input v-model="searchInput" @update:model-value="searchInputUpdateHandler"
        label="Search by group ID or name or description" outlined rounded dense style="width: 380px;" debounce="500"
        clearable>
        <template #prepend>
          <q-icon name="search" color="primary" />
        </template>
      </q-input>
    </div>

    <div class="q-py-md">
      <model-groups-table :loading="isModelGroupListFetching" :model-group-list="modelGroupList">
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

  <q-page class="flex flex-center" v-if="!isFirstTimeFetched && !isFetchError">
    <q-spinner color="primary" size="lg" />
  </q-page>

</template>
<script setup>
import ModelGroupsTable from '../../components/ModelGroupsTable.vue';
import { useModelGroupList } from '../../composables';

const {
  searchInput,
  pagination,
  modelGroupList,
  isModelGroupListFetching,
  rangeOfRecords,
  totalPages,
  totalModelGroupListCount,
  isFetchError,
  isFirstTimeFetched,
  searchInputUpdateHandler,
  pageSizeUpdateHandler,
  paginationUpdateHandler
} = useModelGroupList()

</script>
