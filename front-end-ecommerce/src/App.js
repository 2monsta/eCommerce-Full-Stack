import React, { Component } from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Route} from 'react-router-dom';

//CUSTOM COMPOENT
import NavBar from './containers/NavBar';
import SlickSlider from './components/SlickSlider';
import Register from './containers/Register';
import Home from './components/Home';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path='/' component={SlickSlider}/>
          <div className={"container"}>
            <Route exact path={'/'} component={Home}/>
            <Route exact path={"/register"} component={Register}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
