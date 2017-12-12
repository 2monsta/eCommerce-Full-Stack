import React, {Component} from 'react';

class Navbar extends Component{
  constructor(){
    super();
  }
  render(){
    return(
      <div>
        <nav>
          <div className="nav-wrapper">
            <div className={"container"}>
              <div className={"row"}>
                <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                <ul id="nav-mobile" className="left hide-on-med-and-down col s7">
                  <li className={"col s3"}>Home</li>
                  <li className={"col s3"}>Shop</li>
                  <li className={"col s3"}>About Us</li>
                  <li className={"col s3"}>Contact Us</li>
                </ul>
                <ul className="side-nav" id="mobile-demo">
                  <li className={"col s3"}>Home</li>
                  <li className={"col s3"}>Shop</li>
                  <li className={"col s3"}>About Us</li>
                  <li className={"col s3"}>Contact Us</li>
                </ul>
                <div className={"offset-s1 col s3"}>
                  <form>
                    <div>
                      <input id="search" className={"browser-default"} type="text" required placeholder={"   Type Here To Search"} />
                    </div>
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
                  classic logo goes here
                </div>
                <div className={"offset-s4 col s5 left-align"}>
                  Sign in or Create an account | (0) items in cart | ($0.00)
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