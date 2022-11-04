import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../images/logo.png';

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
      <div data-testid="page-login" className="login">
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
      </div>
    );

    return (
      <div className="login-page">
        { isLoading ? <Loading /> : form }
        {
          redirectToSearch && <Redirect to="/search" />
        }
      </div>
    );
  }
}

export default Login;
