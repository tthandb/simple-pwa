import axios, { AxiosResponse } from 'axios'
import { User, UserInformation } from '../types'
import { sendLog } from '../logger'

export const postLogin = (user: User) => {
  sendLog('info', 'Send login request to /login', JSON.stringify(user)).then(() => true)
  return axios.post<User, AxiosResponse>('/login', user)
    .then((res) => res.data)
}

export const postRegister = (user: UserInformation) => {
  sendLog('info', 'Send registration request to /register', JSON.stringify(user)).then(() => true)
  return axios.post<UserInformation>('/register', user).then((res) => res.data)
}
