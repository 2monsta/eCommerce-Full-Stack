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
                <ul className="left hide-on-med-and-down">
                  <li className={"col s2"}>Home</li>
                  <li className={"col s2"}>Shop</li>
                  <li className={"col s2"}>About Us</li>
                  <li className={"col s2"}>Contact Us</li>
                </ul>
                <ul className="side-nav" id="mobile-demo">
                  <li>Home</li>
                  <li>Shop</li>
                  <li>About Us</li>
                  <li>Contact Us</li>
                </ul>
                <div className={"col s3 offset-s4"}>
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
                <div className={"offset-s3 col s5 right-align"}>
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