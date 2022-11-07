import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends Component {
  state = {
    userName: '',
    userEmail: '',
    userImage: '',
    userDescription: '',
    requestIsDone: true,
    isDisableButton: true,
    isSalved: false,
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({
      requestIsDone: false,
    });
    const user = await getUser();
    this.setState({
      userName: user.name,
      userEmail: user.email,
      userImage: user.image,
      userDescription: user.description,
      requestIsDone: true,
    }, () => {
      this.validateButton();
    });
  };

  validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  validateButton = () => {
    const { userEmail, userName, userDescription, userImage } = this.state;
    const isValidEmail = this.validateEmail(userEmail);
    const isValid = userName.length > 0
    && userEmail.length > 0
    && userDescription.length > 0
    && userImage.length > 0;
    if (isValid && isValidEmail) {
      this.setState({
        isDisableButton: false,
      });
    }
  };

  salverUser = async () => {
    const { userName, userEmail, userImage, userDescription } = this.state;

    const userInfo = {
      name: userName,
      email: userEmail,
      image: userImage,
      description: userDescription,
    };
    this.setState({
      requestIsDone: false,
    });
    await updateUser(userInfo);
    this.setState({
      isSalved: true,
      requestIsDone: true,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.validateButton();
    });
  };

  render() {
    const {
      userName,
      userEmail,
      userImage,
      userDescription,
      requestIsDone,
      isDisableButton,
      isSalved,
    } = this.state;
    const editForm = (
      <form>
        <label htmlFor="userName">
          Nome:
          <input
            name="userName"
            id="userName"
            type="name"
            data-testid="edit-input-name"
            value={ userName }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="userEmail">
          Email:
          <input
            type="email"
            name="userEmail"
            id="userEmail"
            data-testid="edit-input-email"
            value={ userEmail }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="userDescription">
          Descrição:
          <textarea
            name="userDescription"
            id="userDescription"
            data-testid="edit-input-description"
            value={ userDescription }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="userImage">
          Foto de Perfil:
          <input
            type="text"
            name="userImage"
            id="username"
            data-testid="edit-input-image"
            value={ userImage }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="edit-button-save"
          disabled={ isDisableButton }
          onClick={ this.salverUser }
        >
          Salvar
        </button>
      </form>
    );

    return (
      <div data-testid="page-profile-edit" className="profile-edit">
        <Header />
        { !requestIsDone ? <Loading /> : editForm }
        { isSalved && <Redirect to="/profile" />}
      </div>
    );
  }
}

export default ProfileEdit;
