import React, { Component } from 'react'

class AutocompleteTextBox extends Component {
  constructor(props) {
    super(props);
    this.items = [
      'Sanitas',
      'Nueva',
      'Compensar',
      'Salud total',
      'Cafesalud',
      'Colsubsidio',
      'Unimec'
    ]
    this.state = {
      suggestions: [],
      value: "",
    }
  }

  onTextChanged = (e) => {
    const value = e.target.value;

    this.setState(() => ({ value }));
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = this.items.sort().filter(v => regex.test(v));
    }
    this.setState(() => ({ suggestions }));
  }

  onSelectOption(e) {
    this.setState(() => ({
      value: e,
      suggestions: [],
    }
    ));
  }


  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((sug,id) => <li key ={id} onClick={() => this.onSelectOption(sug)}><a key={id}> {sug}</a></li>)}
      </ul>
    );
  }
  render() {
    const nameEps = this.state.value;
    return (
      <div>
        <input className="form-control form-control-xs" value={nameEps} onChange={this.onTextChanged} type="text" placeholder="Ingrese EPS"></input>
        {this.renderSuggestions()}
      </div>
    )
  }
}

export default AutocompleteTextBox;