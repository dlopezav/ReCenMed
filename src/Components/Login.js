import React, { Component } from 'react';

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = "Este campo es obligatorio"
  }
  if (!values.email) {
    errors.email = "Este campo es obligatorio"
  }
  else if (values.email.indexOf('@') == -1 || values.email.indexOf('.') - values.email.indexOf('@') < 2) {
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

  if(!values.code){
    errors.code = "Ingrese el código de seguridad"
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
    }
  }
  

  enterApp = () => {
    this.props.datosInicio(this.state.name)
  }
  handleChange = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
  }
  verifyRegister(){
    const { errors, stateForm, ...formData } = this.state
    const result = validate(formData)
    this.setState({ errors: result })
    console.log(Object.keys(result))
    return result;
  }
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
    if(this.verifyRegister().code){
      console.log(this.verifyRegister())
    }
    else{
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
  render() {
    if (this.state.stateForm.login) {
      return (
        <div className="row">
          <div className="card col-12 col-md-8 offset-md-2">
            <div className="card-head">
              <h1>Ingresar como centro médico</h1>
            </div>
            <div className="card-body">

            <form onClick={() => {this.verifyRegister(); } } method = "POST" action = "/reg">
                <div className="row">

                  <div className="form-group col-12 col-md-8 offset-md-2">
                    {this.state.errors.email && <a className="advertencia"> {this.state.errors.email}    </a>}
                    <input name = "email" type="text" className="form-control form-xs" placeholder="Correo Electrónico" />
                    {this.state.errors.password && <a className="advertencia"> {this.state.errors.password}    </a>}
                    <input name = "password" type="password" className="form-control form-xs" placeholder="Contraseña" />
                    <button type="button" className="btn btn-link" onClick={this.onNeedRecover}>¿Olvidaste tu contraseña?</button>
                  </div>
                  {/* <input type = "submit" /> */}
                  <button className="btn btn-success col-md-4 offset-md-4">Ingresar</button>
                </div>
              </form >
            </div>
            <button type="button" className="btn btn-link" onClick={this.onNeedRegister}>¿No estás registrado? Regístrate aquí</button>

          </div>
        </div>
      );
    }
    else if(this.state.stateForm.signIn) {
      return (
        <div className="row">
          <div className="card col-12 col-md-8 offset-md-2">
            <div className="card-head">
              <h1>Registro</h1>
            </div>
            <div className="card-body">

              <div className="form" onSubmit={() => {this.verifyRegister(); } }>
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
                  </div>
                  <button type = "submit" className="btn btn-success col-md-4 offset-md-4" onClick={() => {this.verifyRegister(); } }>Regístrame</button>
                </div>    
              </div>
            </div>
          </div>
        </div>
      );
    }
    else if(this.state.stateForm.recover){
      return(
        <div className="row">
          <div className="card col-12 col-md-8 offset-md-2">
            <div className="card-head">
              <h1>Enviamos un código de verificación a su correo para que pueda cambiar su contraseña</h1>
            </div>
            <div className="card-body">
              <div className="form" onSubmit={() => {this.verifyRegister(); } }>
                <div className="row">
                  <div className="col-12 col-md-8 offset-md-2">
                    <div className="form-group">
                      {this.state.errors.code && <a className="advertencia"> {this.state.errors.code}    </a>}
                      <input name = "code" onChange={this.handleChange} className="form-control" type="text" placeholder="Código de verificación"/>                  
                    </div>
                  </div>
                  <button type = "submit" className="btn btn-success col-md-4 offset-md-4" onClick={this.onChangePassword}>Recuperar Contraseña</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else{
      return(
        <div className="row">
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
                  <button type = "submit" className="btn btn-success col-md-4 offset-md-4" onClick={() => {this.verifyRegister(); } }>Reestablecer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}


export default Login;
