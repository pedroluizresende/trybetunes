import React, { Component } from 'react';
import iconSpinner from '../images/iconSpinner.png';

class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <img src={ iconSpinner } alt="icone loading" />
        <h1>Carregando...</h1>
      </div>
    );
  }
}

export default Loading;
