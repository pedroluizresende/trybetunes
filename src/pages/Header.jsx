import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    userName: '',
    completedRequisition: false,
  };

  async componentDidMount() {
    const usrName = await this.fetchName();
    console.log(usrName);
    this.setState({
      userName: usrName,
      completedRequisition: true,
    });
  }

  fetchName = async () => {
    const name = await getUser();
    console.log(name.name);
    return name.name;
  };

  render() {
    const { userName, completedRequisition } = this.state;
    return (
      <header data-testid="header-component">
        { completedRequisition ? <h1 data-testid="header-user-name">{ userName }</h1>
          : <Loading /> }
        <nav>
          <Link to="/search" data-testid="link-to-search">Search</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
