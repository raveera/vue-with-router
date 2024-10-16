<template>
  <MainTemplate>
    <template #title>
      <div>
        <h1 class="font-weight-bold"> {{ recordName }} Band List </h1>
        <span class="text-subtitle-2"> Total {{ bandList.length }} band</span>
      </div>
    </template>
    <template #item>
      <VRow justify="space-between" class="my-2">
        <VCol sm="4" md="3" lg="3">
          <!-- <InputText v-model="keyword" placeholder="Search Record" /> -->
        </VCol>
        <VBtn color="info" @click="onCreateBandButtonClick">
          Create Band
        </VBtn>
      </VRow>
    </template>
    <template #body>
      <VTable hover height="60vh" fixed-header density="comfortable">
        <thead>
          <tr>
            <th style="min-width: 50px;">#</th>
            <th style="width: 100%;">Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-if="bandList.length > 0">
            <tr v-for="(band, index) in bandList"
              :key="`band-${index}`"
            >
              <td>{{ index + 1 }}</td>
              <td v-html="UiUtil.highlightText(band.band_name, keyword)" />
              <td class="d-flex ga-2 py-2">
                <VBtnIcon
                  color="success"
                  v-tooltip:bottom="'Edit band'"
                  @click="onEditBandButtonClick(band)"
                >
                  <VIcon :icon="mdiPencil" />
                </VBtnIcon>
                <VBtnIcon
                  color="error"
                  v-tooltip:bottom="'Delete band'"
                  @click="onDeleteBandButtonClick(band)"
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
          <!-- <Pagination v-model="pagination"/> -->
        </template>
      </VTable>
    </template>
  </MainTemplate>
  <BandModalView
    v-if="isOpenModal"
    v-model="isOpenModal"
    :record-id="recordId"
    :band="band"
    :action="action"
    @get-band-list="getBandList"
  />
</template>
<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { mdiPencil, mdiDelete } from '@mdi/js'
import { ACTION } from '@/constant'
import UiUtil from '@/util/ui-util'
import bandApi from '@/api/band-api'
import MainTemplate from '@/components/MainTemplate.vue'
import BandModalView from './BandModalView.vue'

const route = useRoute()

const keyword = ref('')
const action = ref('')
const recordName = ref('')
const recordId = ref(0)
const isOpenModal = ref(false)
const band = ref({})
const bandList = ref([])

onBeforeMount( async () => {
  recordId.value = route.params.recordId
  await getBandList()
})

function onCreateBandButtonClick () {
  action.value = ACTION.CREATE
  isOpenModal.value = true
}

function onEditBandButtonClick (tempBand) {
  band.value = tempBand
  action.value = ACTION.EDIT
  isOpenModal.value = true
}

function onDeleteBandButtonClick (tempBand) {
  band.value = tempBand
  action.value = ACTION.DELETE
  isOpenModal.value = true
}

async function getBandList () {
  const loader = UiUtil.loader.show()

  try {
    const response = await bandApi.getBandList(recordId.value, keyword.value)
    
    if (response.success) {
      recordName.value = response.data.recordName
      bandList.value = response.data.bandList
    }
  } catch (error) {
    console.log('get band list error -> ', error)
  } finally {
    loader.hide()
  }
}
</script>
