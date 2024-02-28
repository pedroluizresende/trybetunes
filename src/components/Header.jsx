import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import { CiStar } from 'react-icons/ci';
import { RxAvatar } from 'react-icons/rx';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import logo from '../images/logo.png';
import styles from './Header.module.css';

class Header extends Component {
  state = {
    userName: '',
    completedRequisition: false,
  };

  async componentDidMount() {
    const usrName = await this.fetchName();

    this.setState({
      userName: usrName,
      completedRequisition: true,
    });
  }

  fetchName = async () => {
    const name = await getUser();
    return name.name;
  };

  render() {
    const { userName, completedRequisition } = this.state;
    const curPage = window.location.pathname;
    return (
      <header data-testid="header-component" className={ styles.header }>
        <img src={ logo } alt={ logo } className={ styles.headerLogo } />

        <nav>
          <Link
            to="/trybetunes/search"
            data-testid="link-to-search"
            className={ curPage === '/search' ? styles.active : '' }
          >
            <IoIosSearch />
            <p>
              Pesquisa
            </p>
          </Link>
          <Link
            to="/trybetunes/favorites"
            data-testid="link-to-favorites"
            className={ curPage === '/favorites' ? styles.active : '' }
          >
            <CiStar />
            <p>
              Favoritos
            </p>
          </Link>
          <Link
            to="/trybetunes/profile"
            data-testid="link-to-profile"
            className={ curPage === '/profile' ? styles.active : '' }
          >
            <RxAvatar />
            <p>
              Perfil
            </p>
          </Link>
        </nav>
        {completedRequisition
          ? (
            <h1 data-testid="header-user-name" className={ styles.userName }>
              <RxAvatar />
              {userName}
            </h1>
          )
          : <Loading header textColor="rgb(0, 59, 229, 1)" />}
      </header>
    );
  }
}

export default Header;
