import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header data-testid="header-component">
        <Link to="/search" data-testid="link-to-search">Search</Link>
      </header>
    );
  }
}

export default Header;
