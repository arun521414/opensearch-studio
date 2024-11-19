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
      <q-input label="Search model group" outlined rounded dense style="width: 320px;">
        <template #prepend>
          <q-icon name="search" color="primary" />
        </template>
      </q-input>
    </div>

    <div class="q-py-md">
      <model-groups-table :loading="false" :model-group-list="[]" />
    </div>

  </q-page>
</template>
<script setup>
import ModelGroupsTable from '../../components/ModelGroupsTable.vue';


</script>
