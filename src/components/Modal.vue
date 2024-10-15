<template>
  <VDialog max-width="960" max-height="70vh">
    <VCard>
      <VCardTitle :class="[ACTION_THEME[action].bgColor, 'text-uppercase']">
        {{ title }}
      </VCardTitle>
      <VCardText>
        <template v-if="action === ACTION.DELETE">
          are your sure ?
        </template>
        <slot name="body" v-else />
      </VCardText>
      <VCardActions class="text-uppercase border-t">
        <VSpacer />
        <VBtn
          color="grey"
          text="Cancel"
          @click="emits('onCancelClick')"
        />
        <VBtn
          :color="ACTION_THEME[action].color"
          :text="ACTION_THEME[action].confirmBtnText"
          @click="emits('onConfirmClick')"
          />
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup>
import { ACTION } from '@/constant'

defineProps({
  action: {
    type: String,
    Required: true
  },
  title: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['onCancelClick', 'onConfirmClick'])

const ACTION_THEME = {
  [ACTION.CREATE]: {
    confirmBtnText: 'Create',
    color: 'info',
    bgColor: 'bg-info'
  },
  [ACTION.EDIT]: {
    confirmBtnText: 'Save',
    color: 'success',
    bgColor: 'bg-success'
  },
  [ACTION.DELETE]: {
    confirmBtnText: 'Delete',
    color: 'error',
    bgColor: 'bg-error'
  }
}

</script>