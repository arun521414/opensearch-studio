<template>
  <q-dialog v-model="isDialogShowing" no-backdrop-dismiss no-esc-dismiss>

    <q-card class="full-width" v-if="isPageLoading">
      <q-card-section class="flex flex-center q-py-xl">
        <q-spinner color="primary" size="lg" />
      </q-card-section>
    </q-card>

    <q-card class="full-width" v-if="isPageError">
      <q-card-section class="flex flex-center q-py-xl">
        <div class="text-center q-gutter-y-md">
          <div class="text-h6 text-grey-8">
            Oops..something wrong
          </div>
          <div>
            <q-btn icon="refresh" label="Retry" color="primary" rounded unelevated no-caps @click="retryHandler" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="column no-wrap" style="width: 500px;max-height:88%" v-if="isPageReady">

      <q-card-section class="text-semi-bold text-primary text-h6 text-center q-py-sm">
        Model group info
      </q-card-section>

      <q-separator />

      <q-card-section class="q-gutter-y-sm scroll">

        <div>
          <div class="text-semi-bold text-primary">Group ID</div>
          <div>{{ $route.params.modelGroupId }}</div>
        </div>

        <div class="text-semi-bold">
          <div class="text-primary"> Group name</div>
          <div>{{ modelGroupInfo?.name }}</div>
        </div>

        <div>
          <div class="text-semi-bold text-primary">Group description</div>
          <div>{{ modelGroupInfo?.description }}</div>
        </div>

        <div>
          <div class="text-semi-bold text-primary">Group access mode</div>
          <div>{{ modelGroupInfo?.access }}</div>
        </div>

        <div>
          <div class="text-semi-bold text-primary">Version</div>
          <div>{{ modelGroupInfo?.latest_version }}</div>
        </div>

        <div>
          <div class="text-semi-bold text-primary">Owner</div>
          <div>{{ modelGroupInfo?.owner?.name }}</div>
        </div>

        <div>
          <div class="text-semi-bold text-primary">Backend roles</div>
          <div>
            <q-chip v-for="role in modelGroupInfo?.owner?.backend_roles" :key="role" :label="role" dense
              class="text-semi-bold" color="primary" text-color="white" />
          </div>
        </div>

        <div>
          <div class="text-semi-bold text-primary">Roles</div>
          <div>
            <q-chip v-for="role in modelGroupInfo?.owner?.roles" :key="role" :label="role" dense class="text-semi-bold"
              color="primary" text-color="white" />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <div class="text-semi-bold text-primary">
              Created at
            </div>
            <div>{{ new Date(modelGroupInfo.created_time).toDateString() }}</div>
          </div>
          <div class="col">
            <div class="text-semi-bold text-primary">
              Updated at
            </div>
            <div>{{ new Date(modelGroupInfo.last_updated_time).toDateString() }}</div>
          </div>
        </div>
      </q-card-section>


      <q-card-section class="row justify-around items-center">
        <q-btn label="Close" color="primary" rounded outline no-caps unelevated style="width: 120px;"
          @click="$routerBack({ name: 'ModelGroupList' })" dense />
        <q-btn icon="edit" label="Edit" color="primary" rounded no-caps unelevated style="width: 120px;" dense
          @click="$router.push({ name: 'ModelGroupEdit', params: { modelGroupId: $route.params.modelGroupId } })" />
      </q-card-section>

    </q-card>

  </q-dialog>
</template>
<script setup>
import { ref } from 'vue';
import { useModelGroupInfo } from '../../composables';

const isDialogShowing = ref(true)

const {
  modelGroupInfo,
  isModelGroupInfoFetching,
  isPageReady,
  isPageLoading,
  isPageError,
  retryHandler
} = useModelGroupInfo()

</script>
