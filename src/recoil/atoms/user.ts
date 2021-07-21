import { atom } from 'recoil'
import { User } from '../../utils/types'

const initState: User = {
  email: '',
  password: '',
}

const userState = atom({
  key: 'user',
  default: initState,
})

export default userState
