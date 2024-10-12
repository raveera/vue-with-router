<template>
  <VRow justify="center" align-content="center">
    <VCol
      lg="12"
      xl="10"
    >
      <VRow justify="end" no-gutters class="mb-2 px-4">
        <VBtn
          variant="flat"
          color="primary"
          @click="onLogoutButtonClick"
          >
          <VIcon :icon="mdiLogout" color="white"/>
          Logout
        </VBtn>
      </VRow>
      <VCard class="main-box w-100" elevation="0">
        <VRow no-gutters justify="space-between" align-content="center" class="mb-2">
          <slot name="title" />
        </VRow>
        <slot name="item" />
        <slot name="body" />
      </VCard>
    </VCol>
  </VRow>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { mdiLogout } from '@mdi/js'
import localStorageUtil from '@/util/localStorage-util'

const router = useRouter()

function onLogoutButtonClick () {
  localStorageUtil.remove('userId')
  router.push({name: 'login'})
}
</script>

<style scoped>
  .main-box {
    height: 85vh;
    padding: 16px;
  }
</style>