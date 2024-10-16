<template>
  <MainTemplate>
    <template #title>
      <div>
        <h1 class="font-weight-bold"> Record List </h1>
        <span class="text-subtitle-2">Total {{ recordPerPage.length }} record</span>
      </div>
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
            <th style="min-width: 50px;">#</th>
            <th style="min-width: 480px;">Name</th>
            <th class="text-center">Total Band</th>
            <th class="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="recordPerPage.length > 0">
            <tr v-for="(record, index) in recordPerPage"
              :key="`record-${index}`"
            >
              <td>{{ index + 1 }}</td>
              <td v-html="UiUtil.highlightText(record.name, keyword)" />
              <td class="text-center">{{ record.total_band }}</td>
              <td class="d-flex ga-2 py-2 justify-center">
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
import localStorageUtil from '@/util/localStorage-util'

const router = useRouter()

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
  userId.value = localStorageUtil.get('userId')
  await getRecordList()
})

const filteredRecordList = computed(() => {
  const tempKeyword = (keyword.value) ? keyword.value.toLowerCase() : ''

  const tempFilteredRecordList = recordList.value.filter((record) => {
    const recordName = record.name.toLowerCase()

    return recordName.includes(tempKeyword)
  })

  const tempRecordList = (keyword.value) ? tempFilteredRecordList : recordList.value

  pagination.totalItem = tempRecordList.length

  return tempRecordList
})

const recordPerPage = computed(() => {
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
  const loader = UiUtil.loader.show()

  try {
    const response = await recordApi.getRecordList()

    if (response.success) {
      recordList.value = response.data
    }
    
  } catch (error) {
    console.log('Get record list error', error)
  } finally {
    loader.hide()
  }
}
</script>

