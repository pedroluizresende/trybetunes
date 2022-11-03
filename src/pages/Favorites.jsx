import React, { Component } from 'react';
import Header from './Header';

class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites" className="favorites">
        <Header />
        <h1>Favorites</h1>
      </div>
    );
  }
}

export default Favorites;
