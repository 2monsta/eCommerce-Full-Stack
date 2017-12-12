import React, {Component} from 'react';
// import {Form, FormGroup, ControlLabel, FormControl, Button, Col, MenuItem} from 'react-bootstrap';
import {Button, Icon, Input, Row, MenuItem,Col, SearchForm }from 'react-materialize';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AuthAction from '../actions/AuthAction';

class Register extends Component{
  constructor(){
    super();
    this.state={};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.authAction();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var accountType = document.getElementById("accountType").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var salesRep = document.getElementById("salesRep").value;

    var formInfo = {
      name,
      email,
      password,
      accountType,
      city,
      state,
      salesRep
    };
    this.props.authAction(formInfo);
  }

  render(){
    // this is a value or whatever data type when we set it up to be
    // console.log(this.props.auth);
    // this is a function
    // console.log(this.props.authAction);
    return(
      <form onSubmit={this.handleSubmit}>
        <Input s={12} id={"name"} label="Full Name" />
        <Input type="email" id={"email"} label="Email" s={12} />
        <Input type="password" id={"password"} label="password" s={12} />
        <Input s={12} id={"accountType"} label="Account Type" type={'text'}  />
        <Input s={12} id={"city"} label="City" />
        <Input s={12} id={"state"} label="State" />
        <Input s={12} id={"salesRep"} label="Sales Rep" />
        <Button waves={"light"}>Register </Button>
      </form>

    )
  }
}

function mapStateToProps(state){
  // this.props.key is now accessable to this component
  return {
    auth:state.auth
  }
}

// sends out all the actions to the reducers
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    authAction: AuthAction
  }, dispatch);
}

// export default Register;

// need access to dispahcer and to state
export default connect(mapStateToProps, mapDispatchToProps)(Register)
