import Api from "@/api/base-api"

const recordPath = '/record'

export async function getRecordList (userId) {
  const url = `${recordPath}/${userId}`

  try {
    const response = await Api.get(url)

    return response
  } catch (error) {
    console.log(error)
  }
}

export async function createRecord (userId, name) {
  const url = `${recordPath}/create`
  const body = {
    userId,
    name
  }

  try {
    const response = await Api.post(url, body)

    return response
  } catch (error) {
    console.log(error)
  }
}

export async function editRecord (recordId, name) {
  const url = `${recordPath}/edit`
  const body = {
    recordId,
    name
  }

  try {
    const response = await Api.put(url, body)

    return response
  } catch (error) {
    console.log(error)
  }
}

export async function deleteRecord (recordId) {
  const url = `${recordPath}/${recordId}`

  try {
    const response = await Api.remove(url)

    return response
  } catch (error) {
    console.log(error)
  }
}

export default {
  getRecordList,
  createRecord,
  editRecord,
  deleteRecord
}