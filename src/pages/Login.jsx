import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../images/logo.png';
import styles from './Login.module.css';

class Login extends Component {
  state = {
    inputName: '',
    buttonIsDisabled: true,
    isLoading: false,
    redirectToSearch: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    const num = 3;
    this.setState({
      [name]: value,
    }, () => {
      if (value.length >= num) {
        this.setState({
          buttonIsDisabled: false,
        });
      } else {
        this.setState({
          buttonIsDisabled: true,
        });
      }
    });
  };

  pushEnter = async () => {
    const { inputName } = this.state;
    this.setState({
      isLoading: true,
    });
    await createUser({ name: inputName });
    this.setState({
      redirectToSearch: true,
    });
  };

  render() {
    const { inputName, buttonIsDisabled, isLoading, redirectToSearch } = this.state;
    const form = (
      <main data-testid="page-login" className={ styles.login }>
        <img src={ logo } alt="logo trybeTunes" />
        <form>
          <label htmlFor="name">
            <input
              name="inputName"
              type="name"
              data-testid="login-name-input"
              onChange={ this.handleChange }
              value={ inputName }
              placeholder="qual é o seu nome?"
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            onClick={ this.pushEnter }
            disabled={ buttonIsDisabled }
          >
            Entrar
          </button>
        </form>
      </main>
    );

    return (
      <div className="login-page">
        { isLoading ? <Loading
          header={ false }
          textColor="rgb(0, 59, 229, 1)"
          P
        /> : form }
        {
          redirectToSearch && <Redirect to="/trybetunes/search" />
        }
      </div>
    );
  }
}

export default Login;
