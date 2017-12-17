import React, {Component} from 'react';
import {connect} from "react-redux";
import {Input, Button} from 'react-materialize';

class UserProfile extends Component{
  render(){
    return(
      <div>
        <h1>User Profile</h1>
        <form onSubmit={this.handleSubmit}>
          <Input s={12} id={"name"} label="New Full Name" />
          <Input type="email" id={"email"} label="Email" s={12} />
          <Input type="password" id={"password"} label="password" s={12} />
          <Input s={12} id={"accountType"} label="Account Type" type={'text'}  />
          <Input s={12} id={"city"} label="City" />
          <Input s={12} id={"state"} label="State" />
          <Input s={12} id={"salesRep"} label="Sales Rep" />
          <Button waves={"light"}>Register </Button>
        </form>
      </div>
    )
  }
}

export default UserProfile;