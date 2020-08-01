import React, { Component } from 'react';
import AutocompleteTextBox from './AutocompleteTextBox';


class Preferencias extends Component {

  constructor(){
    super();
    this.speciality = React.createRef();
    this.necesity = React.createRef();
    this.age = React.createRef();
    this.eps = React.createRef();
  }


  generateRecomendation = () => {
    this.props.filtrar(this.speciality.current.value, this.necesity.current.value, this.age.current.value, this.eps.current.state.value);

  }
  renderEspecialidad = () =>{
    const spe = ['Alergología', 'Anestesiología', 'Cardiología', 'Gastroenterología',
    'Endocrinología', 'Geriatría', 'Hepatología', 'Hematología',
    'Infectología', 'Medicina del deporte', 'Medicina del trabajo',
    'Medicina intensiva', 'Medicina interna', 'Nefrología', 'Neumología',
    'Neurología', 'Oncología médica', 'Pediatría', 'Psiquiatría',
    'Reumatología', 'Toxicología', 'Covid'];

    return(
      <select>
        spe.map((spe, id) => (
          <option
            key={id}
            value={spe}>
            {spe}
          </option>
        ))
      </select>
    
    );
  }
  renderEdad = () =>{
    const age = [
      'uci_niño',
      'uci_adulto',
      'uci_neonato',
      'intermedio_niño',
      'intermedio_adulto',
      'intermedio_neonato',
      'general_niño',
      'general_adulto',
      'general_neonato']

    return(
      <select>
        age.map((uti, id) => (
          <option
            key={id}
            value={uti}>
            {capitalize(uti.split("_")[1])}
          </option>
        ))
      </select>
    
    );
  }
  renderUnidad = () =>{
    const age = [
      'uci_niño',
      'uci_adulto',
      'uci_neonato',
      'intermedio_niño',
      'intermedio_adulto',
      'intermedio_neonato',
      'general_niño',
      'general_adulto',
      'general_neonato']
    return(
      <select>
        age.map((uti, id) => (
          <option
            key={id}
            value={uti}>
            {capitalize(uti.split("_")[0])}
          </option>
        ))
      </select>
    
    );
  }
  render() {
    return (
      <div className="jumbotron mt-2 collapse" id="panel">
        <form onSubmit={this.generateRecomendation}>
          <div className="row">
            <div className="form-group col-md-12">
              <div className=" input-group-prepend">
                {/* <label for ="selectEspecialidad" className="input-group-text col-12 col-md-2">Especialidad:</label>                           */}
                <select ref={this.speciality} name="selectEspecialidad" id="selectEspecialidad" className="offset-md-2 form-control col-12 col-md-8">
                  <option disabled selected>Especialidad...</option>
                  <option value="Covid">Covid</option>
                  <option value="Cardiología">Cardiología</option>
                  <option value="Dermatología">Dermatología</option>
                  <option value="Oftalmología">Oftalmología</option>
                  <option value="Pediatría">Pediatría</option>
                </select>
              </div>
            </div>
            <div className="form-group col-md-12">
              <div className=" input-group-prepend">
                {/* <label for ="selectEspecialidad" className="input-group-text col-12 col-md-2">Necesito:</label>                           */}
                <select ref={this.necesity} name="selectEspecialidad" id="selectEspecialidad" className="offset-md-2 form-control col-12 col-md-8">
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
                {/* <select ref={this.age} name="selectEspecialidad" id="selectEspecialidad" className="offset-md-2 form-control col-12 col-md-8">
                  <option disabled selected>La persona a ser atendida es...</option>
                  <option value="neonato">Neonato</option>
                  <option value="nino">Niño</option>
                  <option value="adulto">Adulto</option>
                </select> */}
                {this.renderEdad()}
              </div>
            </div>

            <div className="form-group col-md-8 offset-md-2 col-10 offset-1" id="inputs">
              <AutocompleteTextBox ref={this.eps}/>
              {/* <div className="form-group col-md-8 offset-md-2 col-10 offset-1">  */}
              {/* <input type="text" calssName="form-control form-control-xs" placeholder="dirección"/> */}
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