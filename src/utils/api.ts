import axios, { AxiosResponse } from 'axios'
import { Customer, User, UserInformation } from './types'

export const postLogin = async (user: User) => {
  const { data } = await axios.post<User, AxiosResponse>('/login', user)
  return data
}

export const postRegister = (user: UserInformation) => axios.post<UserInformation>('/register', user).then((res) => res.data)

export const getUser = (user: UserInformation) => axios.get<UserInformation>('/users').then((res) => res.data)

export const getCustomers = async () => {
  const { data } = await axios.get<Customer[], AxiosResponse>('/customers')
  return data
}

export const updateCustomer = (id: number | undefined, data: Customer) => axios.put<Customer>(`/customers/${id}`, data).then((res) => res.data)

export const postCustomer = (data: Customer) => axios.post<Customer>('/customers', data).then((res) => res.data)

export const deleteCustomer = (id: number) => axios.delete(`/customers/${id}`).then((res) => res.data)
