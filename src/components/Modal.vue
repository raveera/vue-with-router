<template>
  <VDialog max-width="960" max-height="70vh">
    <VCard>
      <VCardTitle :class="[ACTION_THEME[action].bgColor]">
        {{ title }}
      </VCardTitle>
      <VCardText>
        <slot name="body">
          are your sure ?
        </slot>
      </VCardText>
      <VCardActions class="text-uppercase border-t">
        <VSpacer />
        <VBtn
          variant="outlined"
          color="grey"
          text="Cancel"
          @click="$emit('onCancelClick')"
        />
        <VBtn
          variant="outlined"
          :color="ACTION_THEME[action].color"
          :text="ACTION_THEME[action].confirmBtnText"
          @click="$emit('onConfirmClick')"
          />
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup>
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

const ACTION_THEME = {
  'create': {
    confirmBtnText: 'Create',
    color: 'info',
    bgColor: 'bg-info'
  },
  'edit': {
    confirmBtnText: 'Save',
    color: 'success',
    bgColor: 'bg-success'
  },
  'delete': {
    confirmBtnText: 'Delete',
    color: 'error',
    bgColor: 'bg-error'
  }
}

</script>