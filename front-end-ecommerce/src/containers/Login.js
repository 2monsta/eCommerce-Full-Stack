import React, {Component} from 'react';
import {Button, Icon, Input, Row, MenuItem,Col, SearchForm }from 'react-materialize';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LoginAction from '../actions/LoginAction'

class Login extends Component{
  constructor(){
    super();
    this.state ={
      error: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    var loginData ={
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    };
    if(loginData.password=== ""){
      this.setState({
        error: "Password field cannot be blank"
      });
    }

    this.props.loginAction(loginData);
  }

  // when we receive new state from the reducer
  componentWillReceiveProps(newProps){
    // console.log(newProps.auth.name);

    if(newProps.auth.msg ==="wrongPassword"){
      this.setState({
        error: "This password does not match"
      })
    } else if(newProps.auth.msg==="badUser"){
      this.setState({
        error: "Not Registered"
      })
    }else if(newProps.auth.msg === "loginSuccess"){
      newProps.history.push("/");
    }
  }
  render(){
    return(
      <div>
        <h1>Login</h1>
        <h3 className={"red"}>{this.state.error}</h3>
        <form onSubmit={this.handleSubmit}>
          <Input type="email" id={"email"} label="Email" s={12} />
          <Input type="password" id={"password"} label="password" s={12} />
          <Button waves={"light"}>Login </Button>
        </form>
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    auth:state.auth
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    loginAction: LoginAction
  }, dispatch)
}

// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(Login);