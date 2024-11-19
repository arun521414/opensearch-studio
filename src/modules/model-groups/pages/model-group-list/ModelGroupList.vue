<template>
  <q-page padding>

    <div class="row justify-between items-center">
      <div class="text-semi-bold text-h6 text-primary">
        Model Groups
      </div>
      <div>
        <q-btn icon="add" label="Create Group" color="primary" rounded unelevated no-caps />
      </div>
    </div>

    <div class="row justify-center items-center">
      <q-input v-model="searchInput" @update:model-value="searchInputUpdateHandler" label="Search model group" outlined
        rounded dense style="width: 320px;" debounce="500" clearable>
        <template #prepend>
          <q-icon name="search" color="primary" />
        </template>
      </q-input>
    </div>

    <div class="q-py-md">
      <model-groups-table :loading="isModelGroupListFetching" :model-group-list="modelGroupList" />
    </div>

  </q-page>
</template>
<script setup>
import ModelGroupsTable from '../../components/ModelGroupsTable.vue';
import { useModelGroupList } from '../../composables';


const {
  searchInput,
  modelGroupList,
  isModelGroupListFetching,
  searchInputUpdateHandler
} = useModelGroupList()

</script>
