import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component{
  constructor(){
    super();
  }
  render(){
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
                  <li><Link to={"/"}>Home</Link></li>
                  <li><Link to={"/shop"}>Shop</Link></li>
                  <li><Link to={"/about"}>About Us</Link></li>
                  <li><Link to={"/contact"}>Contact Us</Link></li>
                </ul>
                <div className={"col s3 offset-s2"}>
                  <form>
                    <input id="search" className={"browser-default"} type="text" placeholder={"   Type Here To Search"} />
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
                <div className={"col s3"}>
                  <p>classic logo goes here</p>
                </div>
                <div className={"offset-s4 col s5 hide-on-med-and-down right-align"}>
                  <p className={"linkToLogin"}><Link to={"/login"}>Sign in</Link> or <Link to={"/register"}>Create an account</Link> | (0) items in cart | ($0.00)</p>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar;