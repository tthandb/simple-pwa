import { Logger } from './types'
import { postLog } from './apis'

export const logPlain = (log: Logger) => {
  const first = `[${log.timestamp}] ${log.level.toUpperCase()}: ${log.title} `
  if (typeof log.message === 'string') {
    if (log.message.startsWith('{') || log.message.startsWith('[')) {
      const second = JSON.parse(log.message)
      console.log(first, second)
    } else {
      console.log(`${first}\n\t${log.message}`)
    }
  } else {
    console.log(first)
  }
}

export const sendLog = async (level: 'info' | 'debug' | 'trace' | 'warn' | 'error', title: string, message: string | null = null) => {
  const log: Logger = {
    timestamp: (new Date()).toLocaleString(),
    level,
    title,
    message,
  }
  logPlain(log)
  return postLog(log)
    .then((r) => true)
    .catch((err) => console.log('error', err))
}

export const sendErrorLog = (error: any) => {
  if (error.response) {
    const { data, status, statusText } = error.response
    sendLog('error', `${status} - ${statusText}`, data).then()
  } else if (error.request) {
    console.log(error.request)
  } else {
    console.log('Error', error.message)
  }
}
