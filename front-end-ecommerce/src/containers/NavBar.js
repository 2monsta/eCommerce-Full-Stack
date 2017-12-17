import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import GetProductLines from '../actions/GetProductLines';
import {bindActionCreators} from 'redux';
import UpdateCart from '../actions/UpdateCart';

class Navbar extends Component{
  constructor(){
    super();
  }
  // componentWillReceiveProps(newProps){
  // }
  componentDidMount(){
    this.props.getProductLines();
    
  }

  render(){
    let rightMenuBar;
    let cartText;

    if(this.props.auth.name !== undefined){
      // this mean the user is logged in

      //checking to if the state.cart
      if(this.props.cart.length > 0){
        // there is something in this user's cart.
        const totalPrice = this.props.cart[0].totalPrice;
        const totalItems = this.props.cart[0].totalItems;
        cartText = `(${totalItems}) items in your cart | ($${totalPrice})`
      }else{
        cartText = "Your cart is empty"
      }

      // menu bar depends on user logged in or not
      rightMenuBar = [
        <div key={1} className={"offset-m3 col m6 col s12 right-align hide-on-med-and-down"}>
          {/*this came back from reducer to get the name and cartInfo*/}
          Welcome {this.props.auth.name} | {cartText} <a href={"/"}>Logout</a>
        </div>
      ]
    }else{

      // default menu bar on load that will link to login and register
      rightMenuBar = [
        <div key={2} className={"offset-m3 col m6 col s12 right-align hide-on-med-and-down"}>
          <Link to={"/login"}>Sign in</Link> or <Link to={"/register"}>Create an account </Link>| (0) items in cart | ($0.00)
        </div>
      ]
		}
		// console.log(this.props.productLines);
		var shopMenu = this.props.productLines.map((pl, index)=>{
			var safeLink = encodeURIComponent(pl.productLine);
			return(
				<li key={index} className="dropdown-links">
          <Link to={`/shop/${safeLink}`}>{pl.productLine}</Link>
        </li>
			)
		});
    return(
      <div id={"full-nav navbar-fixed"}>
        <nav>
          <div className="nav-wrapper">
            <div className={"container"}>
              <div className={"row"}>

                {/*top left navbar*/}
                <div className={"col s7"}>
                  <div className={"row hide-on-med-and-down"}>
                    <span className={"col s2"}>
                      {/*links to "/"*/}
                      <Link to={"/"}>Home</Link>
                    </span>
                    <span className={"col s2"}>

                      {/*shows a drop down which links to /shop/whatever"*/}
                      <span className={'col s6 left-aligh shop'}>Shop</span>

                      {/*the arrow which shows the drop down*/}
                      <i className={"material-icons tiny col s6 dropdown-button"} data-activates='dropdown1'>arrow_drop_down</i>

                      {/*the data we get back from database to show what to show on the drop down*/}
                      <ul id='dropdown1' className='dropdown-content'>
                        {shopMenu}
                      </ul>
                    </span>
                    {/*links to the about page route just means to show which component*/}
                    <span className={"col s2"}>
                      <Link to={"/about"}>About Us</Link>
                    </span>

                    {/*links to the contact us route which just means to show which component*/}
                    <span className={"col s3"}>
                      <Link to={"/contact"}>Contact Us</Link>
                    </span>
                  </div>
                </div>

                {/*what it shows when it's on mobile size*/}
                <a href="#" data-activates={"mobile-demo"} className={"button-collapse"}><i className={"material-icons"}>menu</i></a>
                {/*when it's on mobile size device, it will show this as navbar*/}
                <ul className="side-nav" id="mobile-demo">
                  <li><Link to={"/login"}>Sign in</Link></li>
                  <li><Link to={"/register"}>Create an Account</Link></li>
                  <li><Link to={"/"}>Home</Link></li>
                  <li><Link to={"/shop"}>Shop</Link></li>
                  <li><Link to={"/about"}>About Us</Link></li>
                  <li><Link to={"/contact"}>Contact Us</Link></li>
                </ul>

                {/*the search form, at this point, it doesn't do anything*/}
                <div className={"col m3 offset-m2 col s5"}>
                  <form>
                    <input id="search" className={"browser-default"} type="text" placeholder={"  Type Here To Search"} />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </nav>
				<nav>
				  <div className={"nav-wrapper bottom-nav"}>
					<div className={"container"}>
						<div className={"row"}>
							<div className={"col s12 col m3"}>
								classic logo goes here
							</div>

                {/*right menu bar which changes depends on if you sign in or not*/}
								{rightMenuBar}
						</div>
					</div>
				</div>
				</nav>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    auth: state.auth,
    productLines: state.pl,
    cart: state.cart
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getProductLines: GetProductLines,
    addCart: UpdateCart
  }, dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
// export default Navbar;