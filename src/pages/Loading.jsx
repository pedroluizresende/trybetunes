import React, { Component } from 'react';
import PropTypes from 'prop-types';
import iconSpinner from '../images/iconSpinner.png';
import styles from './Loading.module.css';

class Loading extends Component {
  render() {
    const { header, textColor } = this.props;
    const flexDirection = header ? 'row' : 'column';
    const fontSize = header ? '18px' : '48.02px';
    const imgWidth = header ? '40px' : '60.04px';

    return (
      <div className={ styles.loading } style={ { flexDirection } }>
        <img
          src={ iconSpinner }
          alt="icone loading"
          style={ { width: imgWidth } }
        />
        <h1
          style={ { fontSize, color: textColor } }
        >
          Carregando...
        </h1>
      </div>
    );
  }
}

Loading.propTypes = {
  header: PropTypes.bool.isRequired,
  textColor: PropTypes.string.isRequired,
};

export default Loading;
