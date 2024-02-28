import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import styles from './Album.module.css';

class Album extends Component {
  state = {
    musics: [],
    albumInfo: {},
    requestIsDone: true,
    favoriteSongs: [],
    isLoading: false,
  };

  componentDidMount() {
    this.fetchMusics();
    this.getFavoriteSongs();
  }

  getFavoriteSongs = async () => {
    this.setState({
      requestIsDone: false,
    });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
      requestIsDone: true,
    });
  };

  fetchMusics = async () => {
    this.setState({
      requestIsDone: false,
      isLoading: true,
    });
    const {
      match: {
        params: { id },
      } } = this.props;

    const allInfos = await getMusics(id);
    const albumMusics = allInfos.filter((info) => info.trackName);
    this.setState({
      albumInfo: allInfos[0],
      musics: albumMusics,
      isLoading: false,
    });
  };

  clickChange = async (trackId, isFavorite) => {
    const { musics } = this.state;
    const song = musics.find((music) => music.trackId === trackId);
    console.log(song);
    this.setState({
      requestIsDone: false,
    });
    if (!isFavorite) {
      await addSong(song);
      const favoriteSongs = await getFavoriteSongs();
      this.setState({
        requestIsDone: true,
        favoriteSongs,
      });
    } else {
      await removeSong(song);
      const favoriteSongs = await getFavoriteSongs();
      this.setState({
        requestIsDone: true,
        favoriteSongs,
      });
    }
  };

  render() {
    const { albumInfo, musics, requestIsDone, favoriteSongs, isLoading } = this.state;

    return (

      <main data-testid="page-album" className={ styles.container }>

        <Header />
        <main className={ styles.album }>
          <header>
            {
              !isLoading
               && (
                 <>
                   <img src={ albumInfo.artworkUrl100 } alt="capa" />
                   <div>
                     <h1>
                       { albumInfo.collectionName }
                     </h1>
                     <h2>{albumInfo.artistName}</h2>
                   </div>
                 </>
               )
            }
          </header>
          <section className={ styles.musics }>

            { !requestIsDone && <Loading
              header={ false }
              textColor="rgba(192, 195, 201, 1)"
            /> }
            { requestIsDone
            && (
              <ul>
                {
                  musics.map((music) => (
                    <MusicCard
                      key={ music.trackId }
                      music={ music }
                      clickChange={ this.clickChange }
                      favoriteSongs={ favoriteSongs }
                      favorite={ favoriteSongs
                        .some((song) => song.trackId === music.trackId) }
                    />
                  ))
                }
              </ul>
            )}
          </section>
        </main>
      </main>

    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
