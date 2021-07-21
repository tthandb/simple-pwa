import { atom } from 'recoil'
import { Customer } from '../../utils/types'

export const customersState = atom({
  key: 'customers',
  default: [] as Customer[],
})

export const formState = atom({
  key: 'editState',
  default: {
    isEdit: false,
    data: {} as Customer,
  },
})
