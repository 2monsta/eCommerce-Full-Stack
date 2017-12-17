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

  changeInfo(info){
    this.props.update(this.props.auth.token, info);
  }

  render(){
    return(
      <div>
        <h1>User Profile</h1>
          <Input s={12} id={"name"} label="New Full Name" />
          <Button waves={"light"} onClick={()=>{
            const name = document.getElementById("name").value;
            this.changeInfo(name);
          }}>Edit</Button>
          <Input type="email" id={"email"} label="Email" s={12} />
          <Button waves={"light"}>Edit</Button>
          <Input type="password" id={"password"} label="password" s={12} />
          <Button waves={"light"}>Edit</Button>
          <Input s={12} id={"accountType"} label="Account Type" type={'text'}  />
          <Button waves={"light"}>Edit</Button>
          <Input s={12} id={"city"} label="City" />
          <Button waves={"light"}>Edit</Button>
          <Input s={12} id={"state"} label="State" />
          <Button waves={"light"}>Edit</Button>
          <Input s={12} id={"salesRep"} label="Sales Rep" />
          <Button waves={"light"}>Edit</Button>
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