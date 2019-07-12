import React from "react";
import { Switch, Route } from "react-router-dom";
// import CookView from './Components/CookView/CookView';
// import BartenderView from './Components/BartenderView/BartenderView';
import ManagerView from "./Components/ManagerView/ManagerView";
import EmpLogin from "./Components/EmpLogin/EmpLogin";
import ServerView from "./Components/ServerView/ServerView";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import ServerMV from "./Components/ManagerView/ServerMV";
import CookMV from "./Components/ManagerView/CookMV";
import BarMV from "./Components/ManagerView/BarMV";
import "./App.css";

/*
Red = #D84848
Blue = #62B8EF
Green = #A0F290
Yellow = #FCC751 opacity 70%
lightgray= #EDEDED
darkgray=#585555
#547374 Background Color
*/
function App() {
  return (
    <div className="App">
      <Switch>
        {/* <Route path="/" exact strict component={Register} />
        <Route path="/login" exact strict component={Login} />
        <Route path="/server" exact strict component={ServerView} />
        <Route path="/server" exact strict component={ServerView} />
        <Route path="/emplogin" exact strict component={EmpLogin} />
        <Route path="/cook" exact strict component={CookView} /> */}
        <Route path="/" exact strict component={ManagerView} />
        <Route path="/servermv" exact strict component={ServerMV} />
        <Route path="/barmv" exact strict component={BarMV} />
        <Route path="/cookmv" exact strict component={CookMV} />
        {/* <Route path="/bartender" exact strict component={BartenderView} /> */}
      </Switch>
    </div>
  );
}

export default App;
