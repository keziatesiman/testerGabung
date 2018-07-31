'use strict';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import App3 from './App3';
import Reg from './Reg';
import uuid from 'uuid/v4';
import { BrowserRouter as Router, withRouter, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import { Button } from 'antd';

//https://stackoverflow.com/questions/42123261/programmatically-navigate-using-react-router-v4

@inject('authStore')
@observer

class Login extends Component {
constructor(props){
  super(props);
  

  this.state={
  username:'',
  password:'',
  loginView: []
  }
  this.handleClick = this.handleClick.bind(this);

 }

 componentWillMount() {
   var loginView = []
   loginView.push(
    <div>
    <MuiThemeProvider>
      <div>
        
      <AppBar
         title="Login"
       />
      
       <TextField
         hintText="Enter your Username"
         floatingLabelText="Username"
         onChange = {(event,newValue) => this.setState({username:newValue})}
         />
       <br/>
         <TextField
           type="password"
           hintText="Enter your Password"
           floatingLabelText="Password"
           onChange = {(event,newValue) => this.setState({password:newValue})}
           />
         <br/>
         <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
     </div>
     </MuiThemeProvider>
     <br/><br/>
     <div>Don\'t have any account? Sign up now!</div><br/>
     <Button type="primary"><Link to='/register'>Sign Up</Link></Button>
  </div>
   )
    this.setState({
      loginView
    })
 }

 handleClick(event){
    var user= this.state.username;
    var pass= this.state.password;
    const props = this.props 
     
    axios.post('/authenticate', {
      username: user,
      password: pass
    })
    .then(function (response) {
      console.log(response);
      //alert(response.data.statusCode);
      
      if (response.data.statusCode === 200){
        console.log("Anda benar!");

        //this.props.history.push("/App3")
        props.history.push("/App3")

      }
    })
    .catch(function (error) {
      console.log(error);
      alert("Username or Password is incorrect");
    });
  
    // var check = this.props.authStore.check_login(user, pass);
    // //console.log(check);
    // if (check === true){
    //   var token = uuid();
    //   this.props.authStore.setToken(token)
    //   console.log(this.props.authStore.authData.token);
    //   this.props.history.push('/App3')
     
    //   console.log("It's working!!");
      
    //   //alert("It's working!!");
    }

render() {
  // let testPrint = this.props.authStore.authData.username_temp
  // console.log('Test Print : ', testPrint)
  // this.props.authStore.setUsername_temp('Mikaeil')
  // let testPrint2 = this.props.authStore.authData.username_temp
  // console.log('Test Print2 : ', testPrint2)
  
    return (
      <div>
        {this.state.loginView}
      </div>
    );
  }
}

const style = {
 margin: 15,
};
export default (withRouter(Login));