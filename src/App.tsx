import { Redirect, Route, Switch } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Home from './pages/Home'
import CustomerForm from './pages/CustomerForm'
import PrivateRoute from './components/PrivateRoute'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <PrivateRoute path="/home" exact={false} component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Redirect from="/" to="/home" />
      </Switch>
    </QueryClientProvider>
  )
}

export default App
