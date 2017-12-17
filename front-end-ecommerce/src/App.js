import React, { Component } from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Route} from 'react-router-dom';

//CUSTOM COMPOENT
import NavBar from './containers/NavBar';
import SlickSlider from './components/SlickSlider';
import Register from './containers/Register';
import Home from './components/Home';
import Login from './containers/Login';
import ProductLines from './containers/ProductLines';
import UserProfile from './containers/UserProfile';


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
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
