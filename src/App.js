import React, {Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation'
import 'bootswatch/dist/litera/bootstrap.min.css';

class App extends Component {
  state = {}
  render(){
    return (
      <div className="App container" >
        <Navigation />
      </div>
    );
  }
}

export default App;