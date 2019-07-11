import React from "react";
import ServerView from "./Components/ServerView/ServerView";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import ManagerView from "./Components/ManagerView/ManagerView";
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
      <header className="App-header">
        {/* <ServerView /> */}
        {/* <Login /> */}
        {/* <Register /> */}
        <ManagerView />
      </header>
    </div>
  );
}

export default App;
