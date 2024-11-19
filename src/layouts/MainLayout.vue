<template>
  <q-layout view="hHh LpR fFf">

    <q-header class="bg-primary text-white">

      <q-toolbar>

        <q-toolbar-title class="text-semi-bold">
          OpenSearch Studio
        </q-toolbar-title>

        <div class="q-gutter-x-sm on-left">
          <q-badge color="red-8" label="Offline" rounded class="q-px-lg text-semi-bold"
            style="font-size: 14px;padding-block:4px;" />
          <q-btn icon="settings" flat round @click="toggleClusterSettingDialog" />
          <q-btn icon="notifications" flat round />
          <q-btn icon="person" flat round />
        </div>

      </q-toolbar>

    </q-header>

    <q-drawer v-model="isleftDrawerShow" :mini="miniDrawer" :mini-width="60" side="left" bordered
      @mouseenter="miniDrawer = false" @mouseleave="miniDrawer = true" :width="250"
      style="border-radius: 0px 8px 8px 0px;">
      <q-scroll-area class="fit">
        <q-list padding class="q-gutter-y-sm">

          <q-item v-for="module in moduleList" :key="module.routes.name" :to="{ name: module.routes.name }" clickable
            :class="miniDrawer ? '' : 'q-mr-sm'" active-class="text-white bg-primary text-semi-bold"
            style="border-radius: 0px 24px 24px 0px;">
            <q-item-section avatar>
              <q-icon :name="'img:' + module.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ module.label }}</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { moduleList } from 'src/boot/modules';

const isleftDrawerShow = ref(true)
const miniDrawer = ref(true)

const isClusterSettingDialogShowing = ref(false)

function toggleClusterSettingDialog() {
  isClusterSettingDialogShowing.value = !isClusterSettingDialogShowing.value
}

</script>
