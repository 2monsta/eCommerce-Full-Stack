import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import GetProductLines from '../actions/GetProductLines';
import {bindActionCreators} from 'redux';

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
    if(this.props.auth.name !== undefined){
      // this mean the user is logged in
      var rightMenuBar = [
        <div key={1} className={"offset-m3 col m6 col s12 right-align hide-on-med-and-down"}>
          Welcome {this.props.auth.name} | (0) items in cart | ($0.00) <a href={"/"}>Logout</a>
        </div>
      ]
    }else{
      var rightMenuBar = [
        <div key={2} className={"offset-m3 col m6 col s12 right-align hide-on-med-and-down"}>
          <Link to={"/login"}>Sign in</Link> or <Link to={"/register"}>Create an account </Link>| (0) items in cart | ($0.00)
        </div>
      ]
		}
		// console.log(this.props.productLines);
		var shopMenu = this.props.productLines.map((pl, index)=>{
			var safeLink = encodeURIComponent(pl.productLine);
			return(
				<li key={index} className="dropdown-links"><Link to={`/shop/${safeLink}`}>{pl.productLine}</Link></li>
			)
		});
    return(
      <div id={"full-nav navbar-fixed"}>
        <nav>
          <div className="nav-wrapper">
            <div className={"container"}>
              <div className={"row"}>
                <a href="#" data-activates={"mobile-demo"} className={"button-collapse"}><i className={"material-icons"}>menu</i></a>
                <div className={"col s7"}>
                  {/*<ul className="hide-on-med-and-down">*/}
                    <div className={"row hide-on-med-and-down"}>
                      <span className={"col s2"}><Link to={"/"}>Home</Link></span>
                      <span className={"col s2"}>
												<span className={'col s6 left-aligh shop'}>Shop</span>
												<i className={"material-icons tiny col s6 dropdown-button"} data-activates='dropdown1'>arrow_drop_down</i>
												<ul id='dropdown1' className='dropdown-content'>
													{shopMenu}
												</ul>
											</span>
                      <span className={"col s2"}><Link to={"/about"}>About Us</Link></span>
                      <span className={"col s3"}><Link to={"/contact"}>Contact Us</Link></span>
                    </div>
                  {/*</ul>*/}
                </div>
                <ul className="side-nav" id="mobile-demo">
                  <li><Link to={"/login"}>Sign in</Link></li>
                  <li><Link to={"/register"}>Create an Account</Link></li>
                  <li><Link to={"/"}>Home</Link></li>
                  <li><Link to={"/shop"}>Shop</Link></li>
                  <li><Link to={"/about"}>About Us</Link></li>
                  <li><Link to={"/contact"}>Contact Us</Link></li>
                </ul>
                <div className={"col m3 offset-m2 col s5"}>
                  {/*<i className={"material-icons"}>search</i>*/}
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
    productLines: state.pl
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getProductLines: GetProductLines,
  }, dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
// export default Navbar;