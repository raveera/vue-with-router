<template>
  <h1> Record List </h1>
  <VBtn @click="onLogoutButtonClick"/>
</template>

<script setup>
import localStorageUtil from '@/util/localStorage-util';

  function onLogoutButtonClick () {
    localStorageUtil.remove('userId')
  }
</script>
