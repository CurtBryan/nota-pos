import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import CookView from './Components/CookView/CookView';
// import BartenderView from './Components/BartenderView/BartenderView';
// import ManagerView from './Components/ManagerView/ManagerView';
import EmpLogin from './Components/EmpLogin/EmpLogin';
import ServerView from './Components/ServerView/ServerView';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import './App.css';

function App() {
  return (
    <div className="App">
    
      <Switch>
        <Route path="/" exact strict component={Register} />
        <Route path="/login" exact strict component={Login} />
        <Route path="/server" exact strict component={ServerView} />
        <Route path="/server" exact strict component={ServerView} />
        <Route path="/emplogin" exact strict component={EmpLogin} />
        {/* <Route path="/cook" exact strict component={CookView} />
        <Route path="/manager" exact strict component={ManagerView} />
        <Route path="/bartender" exact strict component={BartenderView} /> */}
      </Switch>



    </div>
  );
}

export default App;


