import React, { Component } from 'react';

//import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
//injectTapEventPlugin();

import './App.css';

import { inject, observer } from 'mobx-react'
import { Switch, Route, withRouter } from 'react-router-dom';


import LoginScreen from './Loginscreen';
//import App2 from './App2';
import App3 from './App3';
import Loginscreen from './Loginscreen';
import Home from './App2'
import Roster from './Roster'
import Schedule from './Schedule'
import Register from './Register'
import Reg from './Reg'

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    
  }
  
  render() {
    return (
      <div id='all'>
        <Switch>
            <Route exact path="/" component={LoginScreen} />
            <Route path="/App3" component={App3} />
            <Route exact path='/home' component={Home}/>
            <Route path='/roster' component={Roster}/>
            <Route path='/schedule' component={Schedule}/>
            <Route path='/reg' component={Reg}/>
            <Route path='/register' component={Register}/>
        </Switch>
      </div>
    );
  }
}

export default App;
