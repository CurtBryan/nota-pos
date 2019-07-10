import React from "react";
// import Register from './Components/Register/Register';
import ServerView from "./Components/ServerView/ServerView";
import "./App.css";
import BartenderView from "./Components/BartenderView/BartenderView";
import ManagerView from "./Components/ManagerView/ManagerView";
import Login from "./Components/Login/Login";

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
      <header className="App-header">
        <Login />
        {/* <Register /> */}
        {/* <ServerView /> */}
        {/* <BartenderView /> */}
        {/* <ManagerView /> */}
      </header>
    </div>
  );
}

export default App;
