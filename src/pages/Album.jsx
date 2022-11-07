import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    musics: [],
    albumInfo: {},
    requestIsDone: true,
    favoriteSongs: [],
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
    });
  };

  clickChange = async ({ target }) => {
    const { musics } = this.state;
    const song = musics.find((music) => music.trackId === (+target.name));
    this.setState({
      requestIsDone: false,
    });
    if (target.checked) {
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
    const { albumInfo, musics, requestIsDone, favoriteSongs } = this.state;
    const albumInfos = (
      <section className="album-content">
        <section className="album-info">
          <img src={ albumInfo.artworkUrl100 } alt="" />
          <h1 data-testid="album-name">{ albumInfo.collectionName }</h1>
          <h2 data-testid="artist-name">{ albumInfo.artistName }</h2>
        </section>
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
      </section>
    );
    return (

      <div data-testid="page-album" className="album">
        <Header />
        {
          !requestIsDone
            ? <Loading />
            : albumInfos
        }
      </div>

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
