import React, { Component } from 'react';

function capitalize(word) {

  return word[0].toUpperCase() + word.slice(1);
}

function dividirCadena(cadenaADividir, separador) {
  var arrayDeCadenas = cadenaADividir.split(separador);
  return capitalize(arrayDeCadenas[0]) + " " + arrayDeCadenas[1];

}
const validateLogin = values => {
  // console.log(values)
  const errors = {}
  // if (!values.name) {
  //   errors.name = "Este campo es obligatorio"
  // }
  if (!values.email) {
    errors.email = "Este campo es obligatorio"
  }
  else if (values.email.indexOf('@') == -1 || values.email.indexOf('.') == -1) {
    errors.email = "No es una dirección válida"
  }
  if (!values.password) {
    errors.password = "Este campo es obligatorio"
  }
  return errors
}

const validateRegister = values => {
  const errors = {}
  if (!values.name) {
    errors.name = "Este campo es obligatorio"
  }
  if (!values.email) {
    errors.email = "Este campo es obligatorio"
  }
  else if (values.email.indexOf('@') == -1 || values.email.indexOf('.') == -1) {
    errors.email = "No es una dirección válida"
  }
  if (!values.password) {
    errors.password = "Este campo es obligatorio"
  }
  else {
    if (!values.confpassword) {
      errors.confpassword = "Este campo es obligatorio"
    }
    else if (values.password != values.confpassword) {
      errors.confpassword = "Las contraseñas no coinciden"
    }
  }
  // if(!values.code){
  //   errors.code = "Ingrese el código de seguridad"
  // }
  if (!values.address) {
    errors.address = "Este campo es obligatorio"
  }
  return errors
}

const validateRecover = values => {
  if (!values.email) {
    errors.email = "Este campo es obligatorio"
  }
  else if (values.email.indexOf('@') == -1 || values.email.indexOf('.') == -1) {
    errors.email = "No es una dirección válida"
  }
  if (!values.code) {
    errors.code = "Ingrese el código de seguridad"
  }
  return errors
}

const validateNewPass = values => {
  if (!values.password) {
    errors.password = "Este campo es obligatorio"
  }
  else {
    if (!values.confpassword) {
      errors.confpassword = "Este campo es obligatorio"
    }
    else if (values.password != values.confpassword) {
      errors.confpassword = "Las contraseñas no coinciden"
    }
  }
  return errors
}


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stateForm: {
        login: true,
        signIn: false,
        recover: false,
        newPassword: false,
      },
      errors: {},
      addEspecialidad: false
    };
    this.specialitiesRef = React.createRef();
    this.unitiesRef = React.createRef();
    this.valueSpecialities = React.createRef();
    this.valueTotal = React.createRef();
    this.valueAssigned = React.createRef();
  }

  onChangeSpeciality = () => {
    this.props.specialities.forEach(element => {
      if(element.spc_name == this.specialitiesRef.current.value){
        this.valueSpecialities.current.value = element.spc_doctor;
      }
    });
  }

  onChangeUnity = () => {
    this.props.unities.forEach(element =>{
      if(element.uni_name == this.unitiesRef.current.value){
        this.valueTotal.current.value = element.uni_capacity_total;
        this.valueAssigned.current.value = element.uni_capacity_assigned;
      }
    });
  }

  // enterApp = () => {
  //   this.props.datosInicio(this.state.name)
  // }
  handleChange = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
    
  }
  // verifyRegister(){
  //   const { errors, stateForm, ...formData } = this.state
  //   const result = this.validateLogin(formData)
  //   this.setState({ errors: result })
  //   console.log(Object.keys(result))}

  //   return result;
  // }
  onNeedRegister = () => {
    this.setState(() => ({
      stateForm: {
        login: false,
        signIn: true,
        recover: false,
        newPassword: false,
      },
      errors: {}
    })
    )
  }
  onNeedRecover = () => {
    // ñalskdjf
    this.setState(() => ({
      stateForm: {
        login: false,
        signIn: false,
        recover: true,
        newPassword: false,
      },
      errors: {}
    })
    )
  }
  onChangePassword = () => {
    // console.log(this.verifyRegister())
    // errors = {}
    if (this.validateLogin()) {
      console.log(this.verifyRegister())
    }
    else {
      this.setState(() => ({
        stateForm: {
          login: false,
          signIn: false,
          recover: false,
          newPassword: true,
        },
        errors: {}
      })
      )
    }
  }
  handleSubmit(event) {
    alert('A name was submitted: ');
    event.preventDefault();
  }

  obtenerDatos = (e) => {
    e.preventDefault();
    const { errors, stateForm, ...formData } = this.state

    const result = validateLogin(formData)
    this.setState({ errors: result })
    if (Object.keys(result).length == 0) {
      this.props.datosInicio(this.state.email, this.state.password);
    }
    else {
      alert("hay un error");
      console.log(result);
    }
  }

  obtenerRegistro = (e) => {
    e.preventDefault();
    const { errors, stateForm, ...formData } = this.state

    const result = validateRegister(formData)
    this.setState({ errors: result })
    if (Object.keys(result).length == 0) {
      this.props.datosRegistro(this.state.name, this.state.email, this.state.password, this.state.address);
    }
    else {
      alert("hay un error")
      console.log(result)
    }
  }

  obtenerDatosActualizar = (e) => {
    e.preventDefault();
    let b = false
    for (var i = 0; i < this.props.specialities.length; i = i + 1) {
      if (capitalize(this.props.specialities[i].spc_name) == this.state.addEspecialidad) {
        b = true;
      }
    }
    if (!b) {
      
      if(this.state.addEspecialidad){
      const spe = [
        this.props.hospital.hos_id,
        this.state.addEspecialidad,
        0
      ]
      this.props.datosActualizar(this.specialitiesRef.current.value, this.unitiesRef.current.value, this.valueSpecialities.current.value, this.valueTotal.current.value, this.valueAssigned.current.value, [spe])
      this.setState({
        addEspecialidad: false
      })
      }else{
        this.props.datosActualizar(this.specialitiesRef.current.value, this.unitiesRef.current.value, this.valueSpecialities.current.value, this.valueTotal.current.value, this.valueAssigned.current.value, null)
      }
    } else {
      alert("Ya existe esa especialidad")
    }

  }



  renderSpecialities = () => {
    if (this.props.specialities.length === 0) return null;
    return (
      this.props.specialities.map((spe, id) => (
        <option
          key={id}
          value={spe.spc_name}>
          {capitalize(spe.spc_name)}
        </option>
      ))
    );
  }
  renderUnities = () => {
    console.log(this.props.unities);
    if (this.props.unities.length === 0) return null;
    return (
      this.props.unities.map((uni, id) => (
        <option
          key={id}
          value={uni.uni_name}>
          {/*capitalize(*/dividirCadena(uni.uni_name, "_")}
        </option>
      ))
    );
  }
  changeSpe = () => {
    if(this.state.addEspecialidad){
      this.setState({
        addEspecialidad: false
      })
    }else{
      this.setState({
        addEspecialidad: true
      })
    }
  }
  selectSpe = () => {
    const spe = ['Alergología', 'Anestesiología', 'Cardiología', 'Gastroenterología',
       'Endocrinología', 'Geriatría', 'Hepatología', 'Hematología',
       'Infectología', 'Medicina del deporte', 'Medicina del trabajo',
       'Medicina intensiva', 'Medicina interna', 'Nefrología', 'Neumología',
       'Neurología', 'Oncología médica', 'Pediatría', 'Psiquiatría',
       'Reumatología', 'Toxicología', 'Covid']
    if(this.state.addEspecialidad){
      return(
        <select onChange = {this.handleChange} name="addEspecialidad" id="addEspecialidad" className="offset-md-2 form-control col-8 col-md-8 mt-2">
          <option disabled selected>Especialidad a añadir...</option>{
          spe.map((sp, id) => (
            <option
              key={id}
              value={sp}>
              {sp}
            </option>
          ))}
        </select>
      )
    }else{
      return(null)
    }
  }



  render() {
    if (this.props.inRegistro) {
      return (
        <div className="row mt-4">
          <div className="card col-12 col-md-8 offset-md-2">
            <div className="card-head">
              <h1>Actualizar información del centro médico.</h1> <br></br>
              <strong>Nombre:</strong> {this.props.hospital.hos_name}<br></br>
              <strong>Dirección:</strong> {this.props.hospital.hos_address}<br></br>
              <strong>Correo:</strong> {this.props.hospital.hos_email}<br></br>
              <a href="#mapibiris" className="btn btn-danger mx-auto">Ver mapa</a>
            </div>
            <div className="card-body">

              <form onSubmit={this.obtenerDatosActualizar}>
                <div className="row">
                  {/* <div className="input-group"> */}
                    <div className="offset-1 col-12">
                      <select ref={this.specialitiesRef} onChange={this.onChangeSpeciality} name="selectEspecialidad" id="selectEspecialidad" className="offset-md-1 form-control col-8 col-md-8 mt-2">
                        <option disabled selected>Especialidad a modificar...</option>
                        {
                          this.renderSpecialities()
                        }
                      </select>        
                    </div>
                    <div className="offset-2 col-4 mx-auto">
                      <input ref={this.valueSpecialities} type="number" name="#" className="form-control" placeholder="# de especialistas" />
                    </div>
                    <div className="offset-1 col-12">
                    <select ref={this.unitiesRef} onChange={this.onChangeUnity} name="selectUnidad" id="selectUnidad" className="offset-md-1 form-control col-8 col-md-8 mt-2">
                      <option disabled selected>Unidad a modificar...</option>
                      {
                        this.renderUnities()
                      }
                    </select>
                    </div>
                    <div className="offset-2 col-4">
                      <label className ="mt-3">Capacidad total:</label>
                      <input className="inputslog" ref={this.valueTotal} type="number" name="#" className="form-control"/>
                    </div>
                    <div className="col-4">
                    <label className ="mt-3">Capacidad asignada:</label>
                      <input className="inputslog" ref={this.valueAssigned} type="number" name="#" className="form-control"/>
                    </div>
                    {/* <input type = "submit" /> */}
                  {/* </div>  */}
                  <button type="button" onClick={this.changeSpe} className="btn btn-warning col-md-4 offset-md-4 mt-4">Añadir especialidad</button>
                  
                  {this.selectSpe()}
                  <button type="submit" className="btn btn-success col-md-4 offset-md-4 mt-2">Actualizar</button>
                  
                  
                </div>
              </form >
            </div>


          </div>
        </div>
      );
    } else {
      if (this.state.stateForm.login) {
        return (
          <div className="row mt-2">
            <div className="card col-12 col-md-8 offset-md-2">
              <div className="card-head">
                <h1>Ingresar como centro médico</h1>
              </div>
              <div className="card-body">

                <form onSubmit={this.obtenerDatos}>
                  <div className="row">

                    <div className="form-group col-12 col-md-8 offset-md-2">
                      {this.state.errors.email && <a className="advertencia"> {this.state.errors.email}    </a>}
                      <input onChange={this.handleChange} name="email" type="text" className="form-control form-xs" placeholder="Correo Electrónico" />
                      {this.state.errors.password && <a className="advertencia"> {this.state.errors.password}    </a>}
                      <input onChange={this.handleChange} name="password" type="password" className="form-control form-xs" placeholder="Contraseña" />
                      <button type="button" className="btn btn-link" onClick={this.onNeedRecover}>¿Olvidaste tu contraseña?</button>                      
                    </div>
                    {/* <input type = "submit" /> */}
                    <button type="submit" className="btn btn-success col-md-4 offset-md-4">Ingresar</button>
                  </div>
                </form >
              </div>
              <button type="button" className="btn btn-link" onClick={this.onNeedRegister}>¿No estás registrado? Regístrate aquí</button>

            </div>
          </div>
        );
      }
      else if (this.state.stateForm.signIn) {
        return (
          <div className="row mt-2">
            <div className="card col-12 col-md-8 offset-md-2">
              <div className="card-head">
                <h1>Registro</h1>
              </div>
              <div className="card-body">

                <form onSubmit={this.obtenerRegistro}>
                  <div className="row">

                    <div className="form-group col-12 col-md-8 offset-md-2">
                      {this.state.errors.name && <a className="advertencia"> {this.state.errors.name}    </a>}
                      <input onChange={this.handleChange} name="name" type="text" className="form-control" placeholder="Nombre del centro médico" />
                      {this.state.errors.email && <a className="advertencia"> {this.state.errors.email}    </a>}
                      <input onChange={this.handleChange} name="email" type="text" className="form-control" placeholder="Correo electrónico de contacto" />
                      {this.state.errors.password && <a className="advertencia"> {this.state.errors.password}    </a>}
                      <input onChange={this.handleChange} name="password" type="password" className="form-control form-xs" placeholder="Contraseña" />
                      {this.state.errors.confpassword && <a className="advertencia"> {this.state.errors.confpassword}    </a>}
                      <input onChange={this.handleChange} name="confpassword" type="password" className="form-control form-xs" placeholder="Verificar Contraseña" />
                      {this.state.errors.address && <a className="advertencia"> {this.state.errors.address}    </a>}
                      <input onChange={this.handleChange} name="address" type="text" className="form-control form-xs" placeholder="Dirección" />
                    </div>
                    <button type="submit" className="btn btn-success col-md-4 offset-md-4">Regístrame</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      }
      else if (this.state.stateForm.recover) {
        return (
          <div className="row mt-2">
            <div className="card col-12 col-md-8 offset-md-2">
              <div className="card-head">
                <h1>Enviamos un código de verificación a su correo para que pueda cambiar su contraseña</h1>
              </div>
              <div className="card-body">
                <div className="form" onSubmit={() => { this.verifyRegister(); }}>
                  <div className="row">
                    <div className="col-12 col-md-8 offset-md-2">
                      <div className="form-group">
                        {this.state.errors.code && <a className="advertencia"> {this.state.errors.code}    </a>}
                        <input name="code" onChange={this.handleChange} className="form-control" type="text" placeholder="Código de verificación" />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-success col-md-4 offset-md-4" onClick={this.onChangePassword}>Recuperar Contraseña</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      else {
        return (
          <div className="row mt-2">
            <div className="card col-12 col-md-8 offset-md-2">
              <div className="card-head">
                <h1>Nueva contraseña</h1>
              </div>
              <div className="card-body">
                <div className="form">
                  <div className="row">
                    <div className="col-12 col-md-8 offset-md-2">
                      <div className="form-group">
                        {this.state.errors.password && <a className="advertencia"> {this.state.errors.password}    </a>}
                        <input onChange={this.handleChange} name="password" type="password" className="form-control form-xs" placeholder="Contraseña" />
                        {this.state.errors.confpassword && <a className="advertencia"> {this.state.errors.confpassword}    </a>}
                        <input onChange={this.handleChange} name="confpassword" type="password" className="form-control form-xs" placeholder="Verificar Contraseña" />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-success col-md-4 offset-md-4" onClick={() => { this.verifyRegister(); }}>Reestablecer</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}


export default Login;
