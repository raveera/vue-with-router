<template>
  <Modal
    v-model="modelValue"
    title="Create record"
    action="create"
    @on-cancel-click="closeModal"
    @on-confirm-click="onConfirmClick"
  >
    <template #body>
      <VForm ref="modalRef">
        <InputText v-model="recordName" label="Name" required autofocus/>
        <span v-if="errorMsg" class="text-red">{{ errorMsg }}</span>
      </VForm>
    </template>
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import recordApi from '@/api/record-api';
import Modal from '@/components/Modal.vue'
import InputText from '@/components/InputText.vue'

const props = defineProps({
  userId: {
    type: String,
    default: ''
  }
})

const modelValue = defineModel({ required: true })
const emits = defineEmits(['getRecordList'])

const recordName = ref('')
const errorMsg = ref('')
const modalRef = ref(null)

function closeModal () {
  modelValue.value = false
}

async function onConfirmClick () {
  const { valid } = await modalRef.value?.validate()

  if (!valid) {
    return
  }

  try {
    const response = await recordApi.createRecord(props.userId, recordName.value)
    console.log('create response', response)
    if (response.success) {
      emits('getRecordList')
      closeModal()
    } else {
      errorMsg.value = response.message
    }
  } catch (error) {
    console.log('Record modal error ->', error)
  }
}

</script>
