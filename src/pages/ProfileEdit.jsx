import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';
import styles from './ProfileEdit.module.css';
import emptyUserPhoto from '../images/emptyUserPhoto.webp';

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
    console.log(target.value);
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.validateButton();
    });
  };

  render() {
    const { userName, userEmail, userImage, userDescription, requestIsDone,
      isDisableButton, isSalved,
    } = this.state;
    const editForm = (
      <form>
        <div className={ styles.imageSection }>
          {
            userImage === ''
              ? (
                <img
                  className={ styles.userImage }
                  src={ emptyUserPhoto }
                  alt="Foto de Perfil"
                />
              ) : (
                <img
                  className={ styles.userImage }
                  src={ userImage }
                  alt="Foto de Perfil"
                />
              )
          }
          <label htmlFor="userImage">
            <input
              className={ styles.imageInput }
              type="text"
              name="userImage"
              placeholder="Insira um link"
              id="username"
              data-testid="edit-input-image"
              value={ userImage }
              alt="Foto de Perfil"
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div className={ styles.textFields }>
          <label htmlFor="userName">
            Nome:
            <span>Fique à vontade para usar seu nome social</span>
            <input
              name="userName"
              id="userName"
              type="name"
              data-testid="edit-input-name"
              value={ userName }
              onChange={ this.handleChange }
              placeholder="Nome"
            />
          </label>
          <label htmlFor="userEmail">
            Email:
            <span>Escolha um e-mail que consulte diariamente</span>
            <input
              type="email"
              name="userEmail"
              id="userEmail"
              data-testid="edit-input-email"
              value={ userEmail }
              onChange={ this.handleChange }
              placeholder="Email"
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
              placeholder="Sobre mim"
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
        </div>
      </form>
    );

    return (
      <main data-testid="page-profile-edit" className={ styles.container }>
        <Header />

        <section className={ styles.profileEdit }>

          <div className={ styles.banner } />

          <section className={ styles.editSection }>

            { !requestIsDone ? <Loading
              header={ false }
              textColor="rgba(192, 195, 201, 1)"
            /> : editForm }
            { isSalved && <Redirect to="/profile" />}
          </section>

        </section>
      </main>
    );
  }
}

export default ProfileEdit;
