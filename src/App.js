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
      hospitals: [],
      inRegistro: false,
      hospital_id: null,
    }
  }

  Val = (respuesta) => {
    if(respuesta.confirm){
      this.setState({hospital_id: respuesta.hos_id})
    }
  }
  datosInicio = (email, password) =>{
    const myObj = {
      "email": email, "password": password
    }
    // console.log(myObj)
    fetch("/confirmLogin", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(myObj)
    }).then(res => function(res){
      if()
    });
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
    var hospitals = this.state.hospitals;
    return (
      <div className="App container" >
        <Login datosInicio = {this.datosInicio}/>

        {/* <Navigation />

        <Preferencias />
        <button className="btn btn-info mt-2" type="button" data-toggle="collapse" data-target="#panel" aria-expanded="false" aria-controls="panel" id="Buscar">Buscar Recomendación</button>
        <div className="card mx-auto mt-2">
          <Mapa 
          markers = {hospitals}/>
         </div> */}
      </div>
    );
  }
}

export default App;