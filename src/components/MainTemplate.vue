<template>
  <VRow justify="center" align-content="center">
    <VCol
      lg="12"
      xl="10"
    >
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
      <VCard class="main-box w-100">
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
import localStorageUtil from '@/util/localStorage-util'

const router = useRouter()

function onLogoutButtonClick () {
  localStorageUtil.remove('userId')
  router.push({name: 'login'})
}
</script>

<style scoped>
  .main-box {
    height: 80vh;
    padding: 16px;
  }
</style>