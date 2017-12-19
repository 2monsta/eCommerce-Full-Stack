import React, {Component} from 'react';
import axios from 'axios';
import GetInitialCart from "../actions/GetInitialCart";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CartRow from '../components/CartRow';

class Cart extends Component{

  constructor(){
    super();
    this.makePayment=this.makePayment.bind(this);
  }

  makePayment() {
    // only have this variable bcause of the cdn
    var handler = window.StripeCheckout.configure({
      key: 'pk_test_hIqrUdykMdFLGNvORsC2O1V8',
      locale: 'auto',
      token: (token) => {
        var theData = {
          amount: this.props.userCart.totalPrice* 100,
          stripeToken: token.id,
          userToken: this.props.auth.token,
        };
        axios({
          method: 'POST',
          url: `${window.apiHost}/stripe`,
          data: theData
        }).then((response) => {
          console.log(response);
          if (response.data.msg === 'paymentSuccess') {
            this.props.history.push("/thankyou");
          }else{
            console.log(response.data.msg);
          }
        });
      }
    });
    handler.open({
      name: "Pay Now",
      description: 'Pay Now',
      amount: this.props.userCart.totalPrice * 100
    })
  }
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
    console.log(this.props.userCart);
    if(this.props.userCart.totalItems ===0){
      // if this returns, the render is done
      return(
        <div>
          <h5>Your cart is empty! Get shopping!</h5>
        </div>
      )
    }
    if(this.props.userCart.product !== undefined){
      var cartArray = this.props.userCart.product.map((prod, index)=>{
        console.log(prod);
        return(
          <CartRow product={prod} key={index}/>
        )
      });
    }
    return(
      <div>
        <h2>Your order total is: ${this.props.userCart.totalPrice} - <button className={"btn red waves-effect"} onClick={this.makePayment}>Checkout!</button></h2>
        <table className={"responsive-table bordered striped"}>
          <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
          </thead>
          <tbody>
            {cartArray}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    auth: state.auth,
    userCart: state.cart
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getInitialCart:GetInitialCart
  },dispatch);
}

// export default Cart;
export default connect(mapStateToProps,mapDispatchToProps)(Cart);