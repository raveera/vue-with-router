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

export default {
  getRecordList,
  createRecord
}