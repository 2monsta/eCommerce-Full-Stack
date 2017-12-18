import React, {Component} from 'react';
import {connect} from "react-redux";
import {Input, Button} from 'react-materialize';
import {bindActionCreators} from 'redux';
import UpdateInfoAction from '../actions/UpdateInfoAction';

class UserProfile extends Component{
  constructor(){
    super();
    this.changeInfo=this.changeInfo.bind(this);
  }

  changeInfo(info, whatToChange){
    this.props.update(this.props.auth.token, info, whatToChange);
  }

  render(){
    var whatToChange = "";
    return(
      <div>
        <h1>User Profile</h1>
        <Input s={12} id={"name"} label="New Full Name" />
        <Button waves={"light"} onClick={()=>{
          const name = document.getElementById("name").value;
          whatToChange = "customerName";
          this.changeInfo(name, whatToChange);
        }}>Save</Button>

        <Input type="email" id={"email"} label="Email" s={12} />
        <Button waves={"light"} onClick={()=>{
          const email = document.getElementById("email").value;
          whatToChange = "email";
          this.changeInfo(email, whatToChange);
        }}>Save</Button>

        <Input type="password" id={"password"} label="password" s={12} />
        <Button waves={"light"} onClick={()=>{
          const password = document.getElementById("password").value;
          whatToChange = "password";
          this.changeInfo(password, whatToChange);
        }}>Save</Button>

        <Input s={12} id={"city"} label="City" />
        <Button waves={"light"} onClick={()=>{
          const city = document.getElementById("city").value;
          whatToChange = "city";
          this.changeInfo(city, whatToChange);
        }}>Save</Button>
        <Input s={12} id={"state"} label="State" />
        <Button waves={"light"} onClick={()=>{
          const state = document.getElementById("state").value;
          whatToChange = "state";
          this.changeInfo(state, whatToChange);
        }}>Save</Button>
      </div>
    )
  }
}
function mapStateToProps(state){
  return{
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    update: UpdateInfoAction
  },dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);
// export default UserProfile;