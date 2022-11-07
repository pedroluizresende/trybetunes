import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends Component {
  state = {
    userName: '',
    userEmail: '',
    userImage: '',
    userDescription: '',
    requestIsDone: true,
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
    });
  };

  render() {
    const { userName, userEmail, userDescription, userImage, requestIsDone } = this.state;

    const profileInfos = (
      <section className="profile-Infos">
        <h3>Nome:</h3>
        <p>{ userName }</p>
        <h3>Email:</h3>
        <p>{ userEmail }</p>
        <h3>Descrição</h3>
        <p>{ userDescription }</p>
        <img src={ userImage } alt="Foto do usuário" data-testid="profile-image" />
        <Link to="/profile/edit">Editar perfil</Link>
      </section>
    );

    return (
      <div data-testid="page-profile" className="Profile">
        <Header />
        { !requestIsDone ? <Loading /> : profileInfos}
      </div>
    );
  }
}

export default Profile;
