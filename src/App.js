import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/header/Header";
import CreateRoomForm from "./pages/createRoomForm/CreateRoomForm";
import Detail from "./pages/detail/Detail";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import SignUp from "./pages/signup/SignUp";
import Myinfo from "./pages/myInfo/Myinfo";

function App({ authService, dataService }) {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Login authService={authService} />
          </Route>
          <Route path="/signup" exact>
            <SignUp authService={authService} dataService={dataService} />
          </Route>
          <Route path="/rooms" exact>
            <Main authService={authService} dataService={dataService} />
          </Route>
          <Route path="/rooms/room" exact>
            <CreateRoomForm
              authService={authService}
              dataService={dataService}
            ></CreateRoomForm>
          </Route>
          <Route path="/myInfo" exact>
            <Myinfo authService={authService} dataService={dataService} />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
