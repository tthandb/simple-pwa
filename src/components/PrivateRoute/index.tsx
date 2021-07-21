import { Redirect, Route } from 'react-router-dom'
import { FunctionComponent, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { LOGIN_TIMEOUT } from '../../utils/constants'
import { tokenState } from '../../recoil/atoms'
import authorizationProvider from '../../utils/authProvider'

interface IProps {
  path: string,
  exact: boolean,
  component: FunctionComponent
}

const PrivateRoute = (props: IProps) => {
  const { path, exact, component } = props
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
    if (accessToken) authorizationProvider(accessToken)
    else if (isLogin()) {
      const token = localStorage.getItem('access_token')
      authorizationProvider(token)
    }
  }, [])
  return isLogin()
    ? (<Route path={path} exact={exact} component={component} />)
    : (<Redirect to="/login" />)
}

export default PrivateRoute
