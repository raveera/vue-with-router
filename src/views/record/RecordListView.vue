<template>
  <h1> Record List </h1>
  <VBtn @click="onLogoutButtonClick"/>
</template>

<script setup>
import { useRouter } from 'vue-router';
import localStorageUtil from '@/util/localStorage-util';

const router = useRouter()

function onLogoutButtonClick () {
  localStorageUtil.remove('userId')
  router.push({name: 'login'})
}
</script>
