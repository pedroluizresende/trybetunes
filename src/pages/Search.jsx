import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import styles from './Search.module.css';
import Loading from './Loading';
import AlbumsList from '../components/AlbumsList';

class Search extends Component {
  state = {
    isDisabledButtton: true,
    searchInput: '',
    albums: [],
    artistName: '',
    isLoading: false,
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

  searching = async (e) => {
    e.preventDefault();
    const { searchInput } = this.state;
    this.setState({
      searchInput: '',
      albums: [],
      artistName: searchInput,
      isLoading: true,
    });
    const fetchAlbuns = await searchAlbumsAPI(searchInput);
    this.setState({
      albums: fetchAlbuns,
      isLoading: false,
    });
  };

  render() {
    const { isDisabledButtton, searchInput, albums, artistName, isLoading } = this.state;
    return (
      <div data-testid="page-search" className={ styles.container }>
        <Header />
        <main className={ styles.search }>
          <form
            className={ styles.searchForm }
            onSubmit={ (event) => this.searching(event) }
          >
            <input
              type="text"
              data-testid="search-artist-input"
              name="searchInput"
              value={ searchInput }
              onChange={ this.handleChangle }
              placeholder="digite a sua pesquisa"
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ isDisabledButtton }
            >
              Pesquisar
            </button>
          </form>
          <section className={ styles.albumsSection }>
            {
              isLoading
                ? <Loading header={ false } textColor="rgba(192, 195, 201, 1)" />
                : (
                  <AlbumsList
                    albums={ albums }
                    artistName={ artistName }
                  />
                )
            }
          </section>
        </main>
      </div>
    );
  }
}

export default Search;
