import axios, { AxiosResponse } from 'axios'
import { Customer } from '../utils/types'
import { sendLog } from '../utils/logger'

export const getCustomers = async () => {
  sendLog('info', 'Get customers request from /customers').then(() => true)
  const { data } = await axios.get<Customer[], AxiosResponse>('/customers')
  return data
}

export const updateCustomer = (id: number | undefined, data: Customer) => {
  sendLog('info', `Update customer #${id} request to /customers/${id}`, JSON.stringify(data)).then(() => true)
  return axios.put<Customer>(`/customers/${id}`, data).then((res) => res.data)
}

export const postCustomer = (data: Customer) => {
  sendLog('info', 'Post new customer request to /customers', JSON.stringify(data)).then(() => true)
  return axios.post<Customer>('/customers', data).then((res) => res.data)
}

export const deleteCustomer = (id: number) => {
  sendLog('info', `Delete customer #${id} from /customers/${id}`).then(() => true)
  return axios.delete(`/customers/${id}`).then((res) => res.data)
}
