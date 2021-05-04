// Cliente HTTP baseado em Promises para fazer requisições. 
import axios from 'axios'
import { AsyncStorage } from '@react-native-async-storage/async-storage'

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
  if (response.data.message) {
    throw response
  } else {
    return response
  }
})

export default api
