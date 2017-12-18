import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

//CUSTOM COMPOENT
import NavBar from './containers/NavBar';
import SlickSlider from './components/SlickSlider';
import Register from './containers/Register';
import Home from './components/Home';
import Login from './containers/Login';
import ProductLines from './containers/ProductLines';
import UserProfile from './containers/UserProfile';
import Logout from './containers/Logout';
import Cart from './containers/Cart';

class App extends Component {
  render() {
    return (

      <Router>
        <div className="App">
          {/*the only component that will show on all pages*/}
          <NavBar />
          {/*show the slickSlider only when it's exactly at "/"*/}
          <Route exact path='/' component={SlickSlider}/>
          <div className={"container"}>
            {/*will show this page only when it's at "/"*/}
            <Route exact path={'/'} component={Home}/>
            <Route exact path={"/register"} component={Register}/>
            <Route exact path={"/login"} component={Login}/>
						<Route exact path="/shop/:productline" component={ProductLines} />
            <Route exact path={"/profile"} component={UserProfile}/>
            <Route exact path={"/logout"} component={Logout}/>
            <Route exact path={"/cart"} component={Cart}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
