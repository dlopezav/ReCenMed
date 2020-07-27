import React, { Component } from 'react';
import AutocompleteTextBox from './AutocompleteTextBox';


class Preferencias extends Component {
  render() {
    return (
      <div className="jumbotron mt-2 collapse" id="panel">
        <form >
          <div className="row">
            <div className="form-group col-md-12">
              <div className=" input-group-prepend">
                {/* <label for ="selectEspecialidad" className="input-group-text col-12 col-md-2">Especialidad:</label>                           */}
                <select name="selectEspecialidad" id="selectEspecialidad" className="offset-md-2 form-control col-12 col-md-8">
                  <option disabled selected>Especialidad...</option>
                  <option value="covid">Covid</option>
                  <option value="cardiologia">Cardiología</option>
                  <option value="dermatologia">Dermatología</option>
                  <option value="oftalmologia">Oftalmología</option>
                  <option value="oftalmologia">Pediatría</option>
                </select>
              </div>
            </div>
            <div className="form-group col-md-12">
              <div className=" input-group-prepend">
                {/* <label for ="selectEspecialidad" className="input-group-text col-12 col-md-2">Necesito:</label>                           */}
                <select name="selectEspecialidad" id="selectEspecialidad" className="offset-md-2 form-control col-12 col-md-8">
                  <option disabled selected>Necesito...</option>
                  <option value="uci">Unidad de Cuidados Intensivos (UCI)</option>
                  <option value="ucii">Unidad de Cuidados Intermedios</option>
                  <option value="hospitalizacion">Hospitalización general</option>
                  {/* <option value = "UCI">Unidad de Cuidados Intensivos (UCI)</option> */}
                </select>
              </div>
            </div>

            <div className="form-group col-md-12">
              <div className=" input-group-prepend">
                {/* <label for ="selectEspecialidad" className="input-group-text col-12 col-md-2">La personas es:</label>                           */}
                <select name="selectEspecialidad" id="selectEspecialidad" className="offset-md-2 form-control col-12 col-md-8">
                  <option disabled selected>La persona a ser atendida es...</option>
                  <option value="neonato">Neonato</option>
                  <option value="nino">Niño</option>
                  <option value="adulto">Adulto</option>
                </select>
              </div>
            </div>

            <div className="form-group col-md-8 offset-md-2 col-10 offset-1" id="inputs">
              <AutocompleteTextBox />
              {/* <div className="form-group col-md-8 offset-md-2 col-10 offset-1">  */}
              {/* <input type="text" calssName="form-control form-control-xs" placeholder="dirección"/> */}
              <input className="form-control form-control-xs" type="text" placeholder="Direccion"></input>

              {/* </div> */}
            </div>
            <div className="form-group col-md-4 offset-md-4 col-10 offset-1">
              <button type="submit" className="btn btn-sm btn-primary btn-block">Aceptar</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Preferencias;