import React, {Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation'
import Preferencias from './Components/Preferencias'
import 'bootswatch/dist/litera/bootstrap.min.css';

class App extends Component {
  state = {}
  render(){
    return (
      <div className="App container" >
        <Navigation />
        <Preferencias />
      </div>
    );
  }
}

export default App;