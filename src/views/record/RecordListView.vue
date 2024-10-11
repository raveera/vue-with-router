<template>
  <MainTemplate>
    <template #title>
      <h1> Record List </h1>
    </template>
    <template #item>
      <VRow align-content="center" justify="space-between" no-gutters>
        <VCol sm="4" md="3" lg="3">
          <InputText v-model="keyword" placeholder="Search Record" clearable @click:clear="keyword = ''" />
        </VCol>
        <VBtn color="info" @click="onCreateRecordButtonClick">
          Create Record
        </VBtn>
      </VRow>
    </template>
    <template #body>
      <VTable hover height="70vh" fixed-header>
        <thead>
          <tr>
            <th style="width: 50px;">#</th>
            <th style="width: 100%;">Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-if="filteredUserList.length > 0">
            <tr v-for="(record, index) in filteredUserList"
              :key="`record-${index}`"
            >
              <td>{{ index + 1 }}</td>
              <td v-html="UiUtil.highlightText(record.name, keyword)" />
              <td class="d-flex ga-2 py-2">
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
      </VTable>
    </template>
  </MainTemplate>
  <RecordModalView
    v-if="recordModalOpen"
    v-model="recordModalOpen"
    :user-id="userId"
    :record="tempRecord"
    :action="action"
    @get-record-list="getRecordList"
  />
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { mdiPencil, mdiDelete } from '@mdi/js'
import UiUtil from '@/util/ui-util'
import recordApi from '@/api/record-api'
import MainTemplate from '@/components/MainTemplate.vue'
import RecordModalView from './RecordModalView.vue'
import InputText from '@/components/InputText.vue'

const route = useRoute()

const userId = ref('')
const action = ref('')
const keyword = ref('')
const tempRecord = ref({})
const recordList = ref([])
const recordModalOpen = ref(false)

onBeforeMount( async () => {
  userId.value = route.params.id
  await getRecordList()
})

const filteredUserList = computed(() => {
  const tempRecordList = recordList.value.filter((record) => {
    return record.name.includes(keyword.value)
  })
  
  return (keyword.value) ? tempRecordList : recordList.value
})

function onCreateRecordButtonClick () {
  action.value = 'create'
  recordModalOpen.value = true
}

function onEditRecordButtonClick (record) {
  tempRecord.value = record
  action.value = 'edit'
  
  recordModalOpen.value = true
}

function onDeleteRecordButtonClick (record) {
  action.value = 'delete'
  tempRecord.value = record
  recordModalOpen.value = true
}

async function getRecordList () {
  try {
    const response = await recordApi.getRecordList(userId.value)

    if (response.success) {
      recordList.value = response.data
    }
    
  } catch (error) {
    console.log('Get record list error', error)
  }
}
</script>
