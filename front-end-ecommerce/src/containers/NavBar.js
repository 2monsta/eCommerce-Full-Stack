import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
class Navbar extends Component{
  constructor(){
    super();
  }

  componentWillReceiveProps(newProps){
  }


  render(){

    if(this.props.auth.name !== undefined){
      // this mean the user is logged in
      var rightMenuBar = [
        <div className={"offset-m3 col m5 col s12"}>
          Welcome {this.props.auth.name} | (0) items in cart | ($0.00)
        </div>
      ]
    }else{
      var rightMenuBar = [
        <div className={"offset-m4 col m5 col s12"}>
          <Link to={"/login"}>Sign in</Link> or <Link to={"/register"}>Create an account </Link>| (0) items in cart | ($0.00)
        </div>
      ]
    }
    return(
      <div id={"full-nav navbar-fixed"}>
        <nav>
          <div className="nav-wrapper">
            <div className={"container"}>
              <div className={"row"}>
                <a href="#" data-activates={"mobile-demo"} className={"button-collapse"}><i className={"material-icons"}>menu</i></a>
                <div className={"col s7"}>
                  <ul className="hide-on-med-and-down">
                    <div className={"row"}>
                      <li className={"col s2"}><Link to={"/"}>Home</Link></li>
                      <li className={"col s2"}><Link to={"/shop"}>Shop</Link></li>
                      <li className={"col s2"}><Link to={"/about"}>About Us</Link></li>
                      <li className={"col s3"}><Link to={"/contact"}>Contact Us</Link></li>
                    </div>
                  </ul>
                </div>
                <ul className="side-nav" id="mobile-demo">
                  <li><Link to={"/login"}>Sign in</Link></li>
                  <li><Link to={"/register"}>Create an Account</Link></li>
                  <li><Link to={"/"}>Home</Link></li>
                  <li><Link to={"/shop"}>Shop</Link></li>
                  <li><Link to={"/about"}>About Us</Link></li>
                  <li><Link to={"/contact"}>Contact Us</Link></li>
                </ul>
                <div className={"col s3 offset-s2"}>
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
          <div className={"nav-wrapper bottom-nav left-align"}>
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
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Navbar);
// export default Navbar;