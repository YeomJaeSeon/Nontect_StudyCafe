import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import CreateRoomForm from './pages/createRoomForm/CreateRoomForm';
import Detail from './pages/detail/Detail';
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import SignUp from './pages/signup/SignUp';

function App({ authService }) {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Login authService={authService} />
          </Route>
          <Route path="/signup" exact>
            <SignUp authService={authService} />
          </Route>
          <Route path="/rooms" exact>
            <Main authService={authService} />
          </Route>
          <Route path="/rooms/room/:id" exact>
            <Detail />
          </Route>
          <Route path="/rooms/create" exact>
            <CreateRoomForm />
          </Route>
        </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
