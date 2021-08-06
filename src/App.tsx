import { Redirect, Route, Switch } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useEffect } from 'react'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Home from './pages/Home'
import PrivateRoute from './components/PrivateRoute'
import { sendLog } from './utils/logger'

const queryClient = new QueryClient()

function App() {
  useEffect(() => {
    sendLog('info', 'App component mount').then()
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <PrivateRoute path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Redirect from="/" to="/home" />
      </Switch>
    </QueryClientProvider>
  )
}

export default App
