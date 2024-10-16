<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <RouterView /> 
  </div>
</template>

<style>
.v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
  background-color: var(--vt-c-text-dark-2);
}
</style>