<template>
  <VForm ref="loginRef" validate-on="submit lazy" @submit.prevent="onSubmitButtonClick">
    <VCard class="border pa-4" style="min-width: 360px;">
      <div class="d-flex flex-column ga-4">
        <h1 class="mx-auto">Login</h1>
        <InputText v-model="username" label="Username*" required/>
        <InputText v-model="password" label="Password*" type="password" required/>
        <span v-if="hasError" class="text-red">Username or Password is invalid</span>
        <span>
          Didn't has user ? <RouterLink :to="{name: 'register'}">Create User</RouterLink>
        </span>
        <VBtn type="submit" text="Login"/>
      </div>
    </VCard>
  </VForm>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import localStorageUtil from '@/util/localStorage-util'
import userApi from '@/api/user-api'
import InputText from '@/components/InputText.vue'

const router = useRouter()

const username = ref('')
const password = ref('')
const hasError = ref(false)
const loginRef = ref(null)

async function onSubmitButtonClick () {
  const { valid } = await loginRef?.value.validate()

  if (!valid) {
    return
  }
  
  try {
    const res = await userApi.login(username.value, password.value)

    if (res.success) {
      localStorageUtil.set('userId', res.data.user_id)
      router.push({name: 'record'})
    } else {
      hasError.value = true
    }
  } catch (error) {
    console.log('Login err -> ', error)
  }
} 
</script>
