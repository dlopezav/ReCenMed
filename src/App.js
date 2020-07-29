import React, {Component} from 'react';
import './App.css';

import Navigation from './Components/Navigation';
import Preferencias from './Components/Preferencias';
import Login from './Components/Login'
import 'bootswatch/dist/litera/bootstrap.min.css';
import Mapa from './Components/Mapa';
import request from 'superagent';

class App extends Component {
  constructor(){
    super();
    this.state = {
      hospitals: []
    }
  }

  datosInicio = (user, latitud, longitud) =>{

  }
  componentWillMount() {
    request
      .get('http://localhost:3000/getHospitals')
      .end((err, res) => {
        console.log(JSON.parse(res.text));
        const hospitals = JSON.parse(res.text);
        this.setState({
          hospitals: hospitals
        });
      });
  }
  render(){
    var hospitals = this.state.hospitals.map((hospital, i) => {
      return <li key={i}>{hospital.hos_name}</li>
    });
    return (
      <div className="App container" >
        <ul>
          {hospitals}
        </ul>
        <Navigation />

        <Preferencias />
        <button className="btn btn-info mt-2" type="button" data-toggle="collapse" data-target="#panel" aria-expanded="false" aria-controls="panel" id="Buscar">Buscar Recomendación</button>
        <div className="card mx-auto mt-2">
          <Mapa />
        </div>
      </div>
    );
  }
}

export default App;