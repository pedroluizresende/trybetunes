import React, { Component } from 'react';
import Header from './Header';

class Search extends Component {
  state = {
    isDisabledButtton: true,
    searchInput: '',
  };

  handleChangle = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      if (value.length >= 2) {
        this.setState({
          isDisabledButtton: false,
        });
      } else {
        this.setState({
          isDisabledButtton: true,
        });
      }
    });
  };

  render() {
    const { isDisabledButtton, searchInput } = this.state;
    return (
      <div data-testid="page-search" className="search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            name="searchInput"
            value={ searchInput }
            onChange={ this.handleChangle }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isDisabledButtton }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
