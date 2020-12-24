import axios from 'axios'
import { EnvService } from 'services/env'

export const hostApi = axios.create({
  baseURL: EnvService.getApiUrl() || undefined
})
