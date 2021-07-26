export interface Customer {
  id?: number,
  isActive: boolean,
  balance: string,
  age: number,
  name: string,
  gender: string,
  company: string,
  email: string,
  phone: string,
  address: string,
}

export interface User {
  email: string,
  password: string,
  id?: number
}

export interface UserInformation extends User {
  firstName: string,
  lastName: string,
  gender: boolean,
  birthDate: string
}

export interface Token {
  accessToken: string | null,
  expiredTime: string | null
}

interface Logger {
  timestamp: string,
  level: 'info' | 'debug' | 'trace' | 'warn' | 'error',
  title: string,
  message: string | null
}
