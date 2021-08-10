import axios from 'axios'
import { Logger } from '../utils/types'

export const postLog = (log: Logger) => axios.post('/logger', log).then((res) => res.data)
