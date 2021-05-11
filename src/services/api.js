// Cliente HTTP baseado em Promises para fazer requisições. 
import axios from 'axios'
import { AsyncStorage } from 'react-native'

const api = axios.create({
  baseURL: 'http://192.168.12.54:3000',
})

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use((response) => {
  console.log(response)
  if (response.data.error) {
    throw response
  } else {
    return response
  }
})

export default api
