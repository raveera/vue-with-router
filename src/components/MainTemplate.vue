<template>
  <VRow justify="center" align-content="center">
    <VCol
      lg="12"
      xl="10"
    >
      <VRow no-gutters class="mb-2">
        <template v-if="$route.name !== 'record'">
          <VBtn size="small" :icon="mdiArrowLeftThick" @click="router.go(-1)" />
        </template>
        <VSpacer />
        <div class="d-flex align-center">
          <VBtn
            variant="flat"
            color="primary"
            @click="onLogoutButtonClick"
          >
            <VIcon :icon="mdiLogout" color="white"/>
            Logout
          </VBtn>
        </div>
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
import { mdiLogout, mdiArrowLeftThick } from '@mdi/js'
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
  }
</style>