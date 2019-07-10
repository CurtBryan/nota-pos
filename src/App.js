import React from "react";
// import Register from './Components/Register/Register';
import ServerView from "./Components/ServerView/ServerView";
import "./App.css";
import BartenderView from "./Components/BartenderView/BartenderView";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Register /> */}
        <ServerView />
        {/* <BartenderView /> */}
      </header>
    </div>
  );
}

export default App;
