import Api from "@/api/base-api"

const bandPath = '/band'

export async function getBandList (recordId, bandName) {
  const url = `${bandPath}/${recordId}`
  const body = { bandName }

  try {
    const response = await Api.post(url, body)

    return response
  } catch (error) {
    console.log(error)
  }
}

export async function createBand (recordId, bandName) {
  const url = `${bandPath}/create`
  const body = {
    recordId,
    bandName
  }

  try {
    const response = await Api.post(url, body)

    return response
  } catch (error) {
    console.log(error)
  }
}

export async function editBand (recordId, bandId, bandName) {
  const url = `${bandPath}/edit`
  const body = {
    recordId,
    bandId,
    bandName
  }

  try {
    const response = await Api.put(url, body)

    return response
  } catch (error) {
    console.log(error)
  }
}

export async function deleteBand (bandId) {
  const url = `${bandPath}/${bandId}`

  try {
    const response = await Api.remove(url)

    return response
  } catch (error) {
    console.log(error)
  }
}

export default {
  getBandList,
  createBand,
  editBand,
  deleteBand
}