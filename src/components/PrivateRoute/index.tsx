import { Redirect, Route } from 'react-router-dom'
import { FunctionComponent, ReactNode, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { LOGIN_TIMEOUT } from '../../utils/constants'
import { tokenState } from '../../recoil/atoms'
import { authorizationProvider } from '../../apis'
import { sendLog } from '../../utils/logger'

interface IProps {
  path: string,
  exact?: boolean,
  component?: FunctionComponent | null,
  children?: ReactNode | null
}

const PrivateRoute = (props: IProps) => {
  const {
    path, exact, component, children,
  } = props
  const { accessToken, expiredTime } = useRecoilValue(tokenState)

  const checkLoginState = () => {
    if (!accessToken || !expiredTime) {
      return false
    }
    return Date.now() - +expiredTime <= LOGIN_TIMEOUT
  }

  const checkLoginLocalStorage = () => {
    const lastLogin = localStorage.getItem('last_login')

    if (!localStorage.getItem('access_token') || !lastLogin) {
      return false
    }
    return Date.now() - +lastLogin <= LOGIN_TIMEOUT
  }
  const isLogin = () => {
    if (!checkLoginState()) return checkLoginLocalStorage()
    return checkLoginState()
  }

  useEffect(() => {
    if (accessToken) {
      sendLog('info', 'Has valid access token in Recoil State').then()
      authorizationProvider(accessToken)
    } else if (isLogin()) {
      sendLog('info', 'Has valid access token in LocalStorage').then()
      const token = localStorage.getItem('access_token')
      authorizationProvider(token)
    } else {
      sendLog('info', 'Has no valid access token. Redirect to Login page').then()
    }
  }, [])

  if (isLogin()) {
    if (component) return (<Route path={path} exact={exact} component={component} />)
    return (<Route path={path} exact={exact}>{children}</Route>)
  }
  return (<Redirect to="/login" />)
}

PrivateRoute.defaultProps = {
  exact: false,
  component: null,
  children: null,
}

export default PrivateRoute
