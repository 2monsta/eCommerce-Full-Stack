import React, {Component} from 'react';
import {Form, FormGroup, ControlLabel, FormControl, Button, Col, MenuItem} from 'react-bootstrap';
// import {Button, Icon, Input, Row, MenuItem,Col, SearchForm }from 'react-materialize';
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
  }

  render(){
    // this is a value or whatever data type when we set it up to be
    console.log(this.props.auth);
    // this is a function
    // console.log(this.props.authAction);
    return(
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormGroup controlId="formHorizontalName" validationState={this.state.nameError}>
          <Col componentClass={ControlLabel} sm={2}>
            Name
          </Col>
          <Col sm={10}>
            <FormControl type="text" name="fullName" placeholder="Full Name" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalName" validationState={this.state.emailError}>
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl type="email" name="email" placeholder="Email" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalName">
          <Col componentClass={ControlLabel} sm={2}>
            Account Type
          </Col>
          <Col sm={10}>
            <FormControl type="text" name="type" value="customer" disabled />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalName">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl type="password" name="password" placeholder="Password" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalName">
          <Col componentClass={ControlLabel} sm={2}>
            City
          </Col>
          <Col sm={10}>
            <FormControl type="text" name="city" placeholder="City" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalName">
          <Col componentClass={ControlLabel} sm={2}>
            State
          </Col>
          <Col sm={10}>
            <FormControl type="text" name="state" placeholder="State" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalName">
          <Col componentClass={ControlLabel} sm={2}>
            Sales Rep
          </Col>
          <Col sm={10}>
            <FormControl type="text" name="employee" placeholder="Employee you worked with" />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button bsStyle="primary" bsSize="small" type="submit">
              Register
            </Button>
          </Col>
        </FormGroup>
      </Form>
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
