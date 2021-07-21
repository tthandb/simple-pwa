import { atom } from 'recoil'
import { Token } from '../../utils/types'

const tokenState = atom({
  key: 'token',
  default: {} as Token,
})

export default tokenState
