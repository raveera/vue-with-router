import Api from "@/api/base-api"

const userPath = '/user'

export async function register(username, password, name) {
  const url = `${userPath}/register`
  const body = { username, password, name }

  try {
    const response = await Api.post(url, body)

    return response
  } catch (error) {
    console.log(error)
  }
}

export async function login(username, password) {
  const url = `${userPath}/login`
  const body = {
    username,
    password,
  }

  try {
    const response = await Api.post(url, body)

    return response
  } catch (error) {
    console.log(error)
  }
}

export default {
  register,
  login,
};
