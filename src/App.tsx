import { Route } from 'react-router-dom';
import { Switch } from '@chakra-ui/react';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <Switch>
        <Route path="/">
          <Dashboard />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/registration">
          <Registration />
        </Route>
      </Switch>
    </>
  );
}

export default App;
