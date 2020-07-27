import React, {Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation';
import Preferencias from './Components/Preferencias';
import Login from './Components/Login'
import 'bootswatch/dist/litera/bootstrap.min.css';

class App extends Component {
  state = {}

  datosInicio = (user, latitud, longitud) =>{

  }

  render(){
    return (
      <div className="App container" >
        <Login datosInicio = {this.datosInicio}/>
        <Navigation />
  
        <Preferencias />

        <button className="btn btn-info mt-2" type="button" data-toggle="collapse" data-target="#panel" aria-expanded="false" aria-controls="panel" id="Buscar">Buscar Recomendación</button>
      </div>
    );
  }
}

export default App;