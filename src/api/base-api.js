import { HOST_NAME } from "@/constant"

async function get (tempUrl) {
    const url = HOST_NAME + tempUrl

    const option = {
        method: 'GET'
    }

    try {
        const response = await fetch(url, option)
    
        return response.json()
    } catch (error) {
        console.log('err =>', error)
    }
}

async function post (tempUrl, body) {
    const url = HOST_NAME + tempUrl

    const option = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const response = await fetch(url, option)
    
        return response.json()
    } catch (error) {
        console.log('err =>', error)
    }
}

async function put (tempUrl, body) {
    const url = HOST_NAME + tempUrl

    const option = {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const response = await fetch(url, option)
    
        return response.json()
    } catch (error) {
        console.log('err =>', error)
    }
}

async function remove (tempUrl) {
    const url = HOST_NAME + tempUrl

    const option = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const response = await fetch(url, option)
    
        return response.json()
    } catch (error) {
        console.log('err =>', error)
    }
}

export default {
    get,
    post,
    put,
    remove
}
