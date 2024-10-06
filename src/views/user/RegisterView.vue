<template>
  <VForm ref="registerRef" validate-on="submit lazy" @submit.prevent="onSubmitButtonClick">
    <VCard class="border pa-4" style="min-width: 360px;">
      <div class="d-flex flex-column ga-4">
        <h1 class="mx-auto">Register</h1>
        <InputText v-model="name" label="Name*" required />
        <InputText v-model="username" label="Username*" required />
        <InputText
          v-model="password"
          label="Password*"
          type="password"
          required
          :rules="[validatePassword]"
        />
        <InputText
          v-model="tempPassword"
          label="Confirm password*"
          type="password"
          required 
          :rules="[validatePassword]"
          :error-messages="errorMessages"
        />
        <span v-if="error" class="text-red">{{ error }}</span>
        <span>
          Already has user? <RouterLink :to="{ name: 'login' }">Login</RouterLink>
        </span>
        <VBtn type="submit" text="Register" />
      </div>
    </VCard>
  </VForm>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import localStorageUtil from '@/util/localStorage-util';
import userApi from '@/api/user-api'
import InputText from '@/components/InputText.vue'

const router = useRouter()

const username = ref('')
const password = ref('')
const tempPassword = ref('')
const name = ref('')
const errorMessages = ref('')
const error = ref('')
const registerRef = ref(null)

function validatePassword (password) {  
  return (password.length >= 4) || 'Password should more than 4 character'  
}

async function onSubmitButtonClick () {
  const { valid } = await registerRef?.value.validate()

  if (!valid) {
    return
  }

  if (password.value !== tempPassword.value) {
    errorMessages.value = 'Password not match'
  }
  
  try {
    const res = await userApi.register(username.value, password.value, name.value)

    if (res.success) {
      const userId = res.data.userId
      localStorageUtil.set('userId', userId)
      router.push({name: 'record', params: userId})
    } else {
      error.value = res.message
    }
  } catch (error) {
    console.log('Register err -> ', error)
  }
} 
</script>
