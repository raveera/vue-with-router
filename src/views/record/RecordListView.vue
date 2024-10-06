<template>
  <MainTemplate>
    <template #title>
      <h1> Record List </h1>
      <VBtn color="info" @click="onCreateRecordButtonClick">
        Create Record
      </VBtn>
    </template>
    <template #body>
      <VTable hover height="70vh" fixed-header>
        <thead>
          <tr>
            <th style="width: 50px;">#</th>
            <th style="width: 100%;">Name</th>
            <!-- <th>Total</th> -->
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in recordList"
            :key="`record-${index}`"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ record.name }}</td>
            <!-- <td>2</td> -->
            <td class="d-flex ga-2 py-2">
              <VBtn color="success">
                Edit
              </VBtn>
              <VBtn color="error">
                Delete
              </VBtn>
            </td>
          </tr>
        </tbody>
      </VTable>
    </template>
  </MainTemplate>
  <RecordModalView v-if="recordModalOpen" v-model="recordModalOpen" :user-id="userId" @get-record-list="getRecordList"/>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import recordApi from '@/api/record-api'
import MainTemplate from '@/components/MainTemplate.vue'
import RecordModalView from './RecordModalView.vue'

const route = useRoute()

const userId = ref('')
const recordList = ref([])
const recordModalOpen = ref(false)

onBeforeMount( async () => {
  userId.value = route.params.id
  await getRecordList()
})

function onCreateRecordButtonClick () {

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
