<template>
  <VToolbar class="mb-2 px-2" style="border-radius: 8px;" color="grey-darken-2">
    <VSpacer />
    <VBtn
      variant="outlined"
      color="white"
      @click="onLogoutButtonClick"
    >
      Logout
    </VBtn>
  </VToolbar>
  <VCard class="main-box">
    <VRow no-gutters justify="space-between" align-content="center" class="mb-2">
      <slot name="title" />
    </VRow>
    <slot name="body" />
  </VCard>
</template>

<script setup>
import { useRouter } from 'vue-router'
import localStorageUtil from '@/util/localStorage-util'

const router = useRouter()

function onLogoutButtonClick () {
  localStorageUtil.remove('userId')
  router.push({name: 'login'})
}
</script>

<style scoped>
  .main-box {
    width:  80vw;
    height: 80vh;
    padding: 16px;
  }
</style>