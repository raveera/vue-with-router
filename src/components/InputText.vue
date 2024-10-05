<template>
	<VTextField
		v-model="modelValue"
		:label="label"
		:hide-details="(required) ? 'auto' : hideDetails"
		:rules="(required) ? [requireValue] : []"
	>
	</VTextField>
</template>
<script setup>
import { requireValue } from '@/util/validate-util'

const props = defineProps({
	label: {
		type: String,
		required: true
	},
	hideDetails: {
		type: Boolean,
		default: true
	},
	required: {
		type: Boolean,
		default: false
	}
})

const modelValue = defineModel({required: true})
</script>
