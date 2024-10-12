<template>
  <VRow justify="space-between" class="my-2">
    <VCol sm="4" md="3">
      <VCombobox
        v-model="pagination.itemPerPage"
        density="compact"
        variant="outlined"
        label="item per page"
        hide-details
        :items="ITEM_PER_PAGE_LIST"
      />
    </VCol>
    <VPagination
      v-model="pagination.currentPage"
      rounded="circle"
      density="compact"
      show-first-last-page
      :length="totalPage"
      :total-visible="3"
    />
  </VRow>
</template>
<script setup>
import { computed, ref } from 'vue'

const ITEM_PER_PAGE_LIST = [5, 10, 20]

const pagination = defineModel({ type: Object, required: true }) 

const totalPage = computed(() => {
  if (pagination.value.itemPerPage === 0) {
    return 1
  }

  return Math.ceil(pagination.value.totalItem / pagination.value.itemPerPage)
})
</script>