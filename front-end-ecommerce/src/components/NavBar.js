import React, {Component} from 'react';

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
                      <li className={"col s2"}>Home</li>
                      <li className={"col s2"}>Shop</li>
                      <li className={"col s2"}>About Us</li>
                      <li className={"col s3"}>Contact Us</li>
                    </div>
                  </ul>
                </div>
                <ul className="side-nav" id="mobile-demo">
                  <li>Home</li>
                  <li>Shop</li>
                  <li>About Us</li>
                  <li>Contact Us</li>
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
                  <p>Sign in or Create an account | (0) items in cart | ($0.00)</p>
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