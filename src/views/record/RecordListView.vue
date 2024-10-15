<template>
  <MainTemplate>
    <template #title>
      <h1 class="font-weight-bold"> Record List </h1>
    </template>
    <template #item>
      <VRow justify="space-between" class="my-2">
        <VCol sm="4" md="3" lg="3">
          <InputText v-model="keyword" placeholder="Search Record" clearable @click:clear="keyword = ''" />
        </VCol>
        <VBtn color="info" @click="onCreateRecordButtonClick">
          Create Record
        </VBtn>
      </VRow>
    </template>
    <template #body>
      <VTable hover height="60vh" fixed-header density="comfortable">
        <thead>
          <tr>
            <th style="width: 50px;">#</th>
            <th style="width: 100%;">Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-if="userPerPage.length > 0">
            <tr v-for="(record, index) in userPerPage"
              :key="`record-${index}`"
            >
              <td>{{ index + 1 }}</td>
              <td v-html="UiUtil.highlightText(record.name, keyword)" />
              <td class="d-flex ga-2 py-2">
                <VBtnIcon
                  color="warning"
                  v-tooltip:bottom="'open band list'"
                  @click="onViewBandButtonClick(record.record_id)"
                >
                  <VIcon :icon="mdiOpenInNew" />
                </VBtnIcon>
                <VBtnIcon
                  color="success"
                  v-tooltip:bottom="'Edit record'"
                  @click="onEditRecordButtonClick(record)"
                >
                  <VIcon :icon="mdiPencil" />
                </VBtnIcon>
                <VBtnIcon
                  color="error"
                  v-tooltip:bottom="'Edit record'"
                  @click="onDeleteRecordButtonClick(record)"
                >
                  <VIcon :icon="mdiDelete" />
                </VBtnIcon>
              </td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="3">No items</td>
          </tr>
        </tbody>
        <template #bottom>
          <Pagination v-model="pagination"/>
        </template>
      </VTable>
    </template>
  </MainTemplate>
  <RecordModalView
    v-if="recordModalOpen"
    v-model="recordModalOpen"
    :user-id="userId"
    :record="record"
    :action="action"
    @get-record-list="getRecordList"
  />
</template>

<script setup>
import { computed, onBeforeMount, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { mdiPencil, mdiDelete, mdiOpenInNew } from '@mdi/js'
import { ACTION } from '@/constant'
import UiUtil from '@/util/ui-util'
import recordApi from '@/api/record-api'
import MainTemplate from '@/components/MainTemplate.vue'
import RecordModalView from './RecordModalView.vue'
import InputText from '@/components/InputText.vue'
import Pagination from '@/components/Pagination.vue'

const route = useRoute()

const userId = ref('')
const action = ref('')
const keyword = ref('')
const record = ref({})
const recordList = ref([])
const recordModalOpen = ref(false)

const pagination = reactive({
  totalItem: 0,
  itemPerPage: 10,
  currentPage: 1
})

onBeforeMount( async () => {
  userId.value = route.params.id
  await getRecordList()
})

const filteredRecordList = computed(() => {
  const tempFilteredRecordList = recordList.value.filter((record) => {
    return record.name.includes(keyword.value)
  })

  const tempRecordList = (keyword.value) ? tempFilteredRecordList : recordList.value

  pagination.totalItem = tempRecordList.length

  return tempRecordList
})

const userPerPage = computed(() => {
  const startIndex = (pagination.currentPage - 1) * pagination.itemPerPage
  const endIndex = pagination.currentPage * pagination.itemPerPage

  return filteredRecordList.value.slice(startIndex, endIndex)
})

function onCreateRecordButtonClick () {
  action.value = ACTION.CREATE
  recordModalOpen.value = true
}

function onEditRecordButtonClick (tempRecord) {
  record.value = tempRecord
  action.value = ACTION.EDIT
  
  recordModalOpen.value = true
}

function onDeleteRecordButtonClick (tempRecord) {
  record.value = tempRecord
  action.value = ACTION.DELETE
  recordModalOpen.value = true
}

function onViewBandButtonClick (recordId) {
  router.push({name: 'band', params: { recordId: recordId }})
}

async function getRecordList () {
  try {
    const response = await recordApi.getRecordList()

    if (response.success) {
      recordList.value = response.data
    }
    
  } catch (error) {
    console.log('Get record list error', error)
  }
}
</script>
<style scoped>
.v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
  background-color: var(--vt-c-text-dark-2);
}
</style>
