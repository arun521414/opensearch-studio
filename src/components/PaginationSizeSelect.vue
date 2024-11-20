<template>
  <q-select v-model="model" :options="table_size_options" borderless class="text-theme" dense
    @update:model-value="(val) => emits('update:model', val)" />
</template>
<script setup>
import { table_size_options } from 'src/helpers/constants';

const model = defineModel()

const emits = defineEmits(['update:model'])

</script>
