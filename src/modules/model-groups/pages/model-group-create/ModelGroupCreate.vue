<template>
  <q-dialog v-model="isDialogShowing" no-backdrop-dismiss no-esc-dismiss>

    <q-card class="column no-wrap full-width" style="max-height:88%">

      <q-card-section class="text-semi-bold text-primary text-h6 text-center q-py-sm">
        Create model group
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form ref="createModelGroupFormRef" @submit="modelGroupCreateHandler">

          <q-input v-model.trim="modelGroupFormModel.name" label="Group name"
            :rules="[(val) => !!val || 'Please enter a group name']" />

          <q-input v-model.trim="modelGroupFormModel.description" label="Group description" bottom-slots />

          <q-select v-model.trim="modelGroupFormModel.access_mode" label="Group access mode"
            :rules="[(val) => !!val || 'Please select a group access mode']" :options="accessModeOptions" emit-value
            map-options>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                  <q-item-label caption lines="2">{{ scope.opt.description }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>

        </q-form>
      </q-card-section>

      <q-card-section class="row justify-around items-center">
        <q-btn label="Cancel" color="primary" rounded outline no-caps unelevated style="width: 120px;"
          @click="$routerBack({ name: 'ModelGroupList' })" dense :disable="isModelGroupCreating" />
        <q-btn icon="add" label="Create" color="primary" rounded no-caps unelevated style="width: 120px;" dense
          @click="$refs.createModelGroupFormRef.submit()" :loading="isModelGroupCreating" />
      </q-card-section>

    </q-card>

  </q-dialog>
</template>
<script setup>
import { ref } from 'vue';
import { useModelGroupCreate } from '../../composables';
import { accessModeOptions } from '../../helpers/options';

const isDialogShowing = ref(true)

const { modelGroupFormModel, isModelGroupCreating, modelGroupCreateHandler } = useModelGroupCreate()

</script>
