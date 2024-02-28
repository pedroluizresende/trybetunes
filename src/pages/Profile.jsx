import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import styles from './Profile.module.css';
import emptyUserPhoto from '../images/emptyUserPhoto.webp';

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
    console.log(user);
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

    return (
      <div data-testid="page-profile" className={ styles.container }>
        <Header />
        <section className={ styles.perfil }>
          <header>
            {
              userImage === ''
                ? (
                  <img
                    className={ styles.userPhoto }
                    src={ emptyUserPhoto }
                    alt="user"
                    data-testid="profile-image"
                  />
                )
                : (
                  <img
                    className={ styles.userPhoto }
                    src={ userImage }
                    alt="Foto do usuário"
                    data-testid="profile-image"
                  />
                )
            }
          </header>
          <section className={ styles.profileInfos }>
            {
              !requestIsDone && <Loading
                header={ false }
                textColor="rgba(192, 195, 201, 1)"
              />
            }

            {
              requestIsDone
              && (
                <section className={ styles.infos }>
                  <div>
                    <h3>Nome:</h3>
                    <p>{ userName }</p>
                  </div>
                  <div>
                    <h3>Email:</h3>
                    <p>{ userEmail }</p>
                  </div>
                  <div>
                    <h3>Descrição:</h3>
                    <p>{ userDescription }</p>
                  </div>
                  <Link to="/profile/edit">Editar perfil</Link>
                </section>
              )
            }
          </section>
        </section>
      </div>
    );
  }
}

export default Profile;
