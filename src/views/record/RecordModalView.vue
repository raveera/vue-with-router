<template>
  <Modal
    v-model="modelValue"
    :title="MODAL_TITLE[action]"
    :action="action"
    @on-cancel-click="closeModal"
    @on-confirm-click="onConfirmClick"
  >
    <template #body>
      <VForm v-if="(action !== 'delete')" ref="modalRef">
        <InputText v-model="recordName" label="Name" required autofocus/>
        <span v-if="errorMsg" class="text-red">{{ errorMsg }}</span>
      </VForm>
    </template>
  </Modal>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import recordApi from '@/api/record-api'
import Modal from '@/components/Modal.vue'
import InputText from '@/components/InputText.vue'

const props = defineProps({
  userId: {
    type: String,
    default: ''
  },
  record: {
    type: Object,
    default: {}
  },
  action: {
    type: String,
    default: ''
  }
})

const modelValue = defineModel({ required: true })
const emits = defineEmits(['getRecordList'])

const MODAL_TITLE = {
  'create': 'Create Record',
  'edit': 'Edit Record',
  'delete': 'Delete Record'
}

const recordName = ref('')
const errorMsg = ref('')
const modalRef = ref(null)

onBeforeMount(() => recordName.value = (props.action === 'edit') ? props.record.name : '' )

function closeModal () {
  modelValue.value = false
}

async function onConfirmClick () {
  switch (props.action) {
    case 'create':
      createRecord()
      break
    case 'edit':
      if (props.record.name === recordName.value) {
        closeModal()
      } else {
        editRecord()
      }
      break
    case 'delete':
      deleteRecord()
      break
  }
}

async function createRecord () {
  const { valid } = await modalRef.value?.validate()

  if (!valid) {
    return
  }

  try {
    const response = await recordApi.createRecord(props.userId, recordName.value)

    if (response.success) {
      emits('getRecordList')
      closeModal()
    } else {
      errorMsg.value = response.message
    }
  } catch (error) {
    console.log('create record error ->', error)
  }
}

async function editRecord () {
  const { valid } = await modalRef.value?.validate()

  if (!valid) {
    return
  }

  try {
    const response = await recordApi.editRecord(props.record.record_id, recordName.value)

    if (response.success) {
      emits('getRecordList')
      closeModal()
    } else {
      errorMsg.value = response.message
    }
  } catch (error) {
    console.log('edit record error ->', error)
  }
}

async function deleteRecord () {
  try {
    const response = await recordApi.deleteRecord(props.record.record_id)

    if (response.success) {
      emits('getRecordList')
      closeModal()
    } else {
      errorMsg.value = response.message
    }
  } catch (error) {
    console.log('delete record error ->', error)
  }
}
</script>
