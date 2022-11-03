import React, { Component } from 'react';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import CardAlbum from '../CardAlbum';

class Search extends Component {
  state = {
    isDisabledButtton: true,
    searchInput: '',
    albuns: [],
    artistName: '',
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

  searching = async () => {
    const { searchInput } = this.state;
    this.setState({
      searchInput: '',
      albuns: [],
      artistName: searchInput,
    });
    const fetchAlbuns = await searchAlbumsAPI(searchInput);
    this.setState({
      albuns: fetchAlbuns,
    });
  };

  render() {
    const { isDisabledButtton, searchInput, albuns, artistName } = this.state;
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
            onClick={ this.searching }
          >
            Pesquisar
          </button>
        </form>
        <section>
          <h2>{ `Resultado de álbuns de: ${artistName}`}</h2>
        </section>
        <ul className="albuns-list">
          {
            albuns.length === 0
              ? <p>Nenhum álbum foi encontrado</p>
              : albuns.map((album) => (
                <CardAlbum
                  key={ album.collectionId }
                  albumImg={ album.artworkUrl100 }
                  albumName={ album.collectionName }
                  artistName={ album.artistName }
                  collectionId={ album.collectionId }
                />
              ))
          }
        </ul>
      </div>
    );
  }
}

export default Search;
