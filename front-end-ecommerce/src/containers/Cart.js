import React, {Component} from 'react';
import GetInitialCart from "../actions/GetInitialCart";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Cart extends Component{
  componentDidMount(){
    // console.log(this.props.auth);
    // if the user does not have a token, they should not be here
    if(this.props.auth.token === undefined){
      // this.props.history.push('/login');
    }else{
      // the user have a token, go get their cart
      this.props.getInitialCart(this.props.auth.token);
    }
  }

  render(){
    console.log(this.props.cart);
    return(
      <h1>Cart Page</h1>
    )
  }
}

function mapStateToProps(state){
  return{
    auth: state.auth,
    cart: state.cart
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getInitialCart:GetInitialCart
  },dispatch);
}

// export default Cart;
export default connect(mapStateToProps,mapDispatchToProps)(Cart);