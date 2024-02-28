import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import styles from './Favorites.module.css';

class Favorites extends Component {
  state = {
    favoriteSongs: [],
    requestIsDone: true,
  };

  componentDidMount() {
    this.fecthFavoritesSong();
  }

  fecthFavoritesSong = async () => {
    this.setState({
      requestIsDone: false,
    });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
      requestIsDone: true,
    });
  };

  clickChange = async ({ target }) => {
    const { favoriteSongs } = this.state;
    const song = favoriteSongs.find((music) => music.trackId === (+target.name));
    this.setState({
      requestIsDone: false,
    });
    await removeSong(song);
    const newFavoritesList = await getFavoriteSongs();
    this.setState({
      favoriteSongs: newFavoritesList,
      requestIsDone: true,
    });
  };

  render() {
    const { favoriteSongs, requestIsDone } = this.state;
    const favorite = true;
    const favoriteList = (
      <ul>
        {
          favoriteSongs.map((music) => (
            <MusicCard
              key={ music.trackId }
              music={ music }
              clickChange={ this.clickChange }
              favoriteSongs={ favoriteSongs }
              favorite={ favorite }
            />
          ))
        }
      </ul>
    );
    return (
      <main data-testid="page-favorites" className={ styles.container }>
        <Header />
        <section className={ styles.favorites }>
          <header>
            <h1>Músicas Favoritas</h1>
          </header>

          <section className={ styles.favoritesSection }>
            {!requestIsDone ? <Loading
              header={ false }
              textColor="rgba(192, 195, 201, 1)"
            /> : favoriteList }
          </section>
        </section>
      </main>
    );
  }
}

export default Favorites;
