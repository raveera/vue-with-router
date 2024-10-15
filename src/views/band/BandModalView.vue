<template>
  <Modal
    v-model="modelValue"
    :title="MODAL_TITLE[action]"
    :action="action"
    @on-cancel-click="closeModal"
    @on-confirm-click="onConfirmClick"
  >
    <template #body>
      <VForm ref="modalRef">
        <InputText v-model="bandName" label="Name" required autofocus />
        <span v-if="errorMsg" class="text-red">{{ errorMsg }}</span>
      </VForm>
    </template>
  </Modal>
</template>
<script setup>
import { onBeforeMount, ref } from 'vue'
import { ACTION } from '@/constant'
import Modal from '@/components/Modal.vue'
import InputText from '@/components/InputText.vue'
import bandApi from '@/api/band-api'

const MODAL_TITLE = {
  [ACTION.CREATE]: 'Create Band',
  [ACTION.EDIT]: 'Edit Band',
  [ACTION.DELETE]: 'Delete Band'
}

const props = defineProps({
  recordId: {
    type: [Number, String],
    required: true
  },
  band: {
    type: Object,
    default: {}
  },
  action: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['getBandList'])

const modelValue = defineModel({required: true})

const bandName = ref('')
const errorMsg = ref('')
const modalRef = ref(null)

onBeforeMount(() => bandName.value = (props.action === ACTION.EDIT) ? props.band.band_name : '' )

function closeModal () {
  modelValue.value = false
}

async function onConfirmClick () {
  switch (props.action) {
    case ACTION.CREATE:
      createBand()
      break
    case ACTION.EDIT:
      if (props.band.band_name === bandName.value) {
        closeModal()
      } else {
        editBand()
      }
      break
    case ACTION.DELETE:
      deleteBand()
      break
  }
}

async function createBand () {
  const { valid } = await modalRef.value?.validate()

  if (!valid) {
    return
  }

  try {
    const response = await bandApi.createBand(props.recordId, bandName.value)

    if (response.success) {
      emits('getBandList')
      closeModal()
    } else {
      errorMsg.value = response.message
    }
  } catch (error) {
    console.log('create band error ->', error)
  }
}

async function editBand () {
  const { valid } = await modalRef.value?.validate()

  if (!valid) {
    return
  }

  try {
    const response = await bandApi.editBand(props.recordId, props.band.band_id, bandName.value)

    if (response.success) {
      emits('getBandList')
      closeModal()
    } else {
      errorMsg.value = response.message
    }
  } catch (error) {
    console.log('edit band error ->', error)
  }
}

async function deleteBand () {
  try {
    const response = await bandApi.deleteBand(props.band.band_id)

    if (response.success) {
      emits('getBandList')
      closeModal()
    } else {
      errorMsg.value = response.message
    }
  } catch (error) {
    console.log('delete band error ->', error)
  }
}
</script>