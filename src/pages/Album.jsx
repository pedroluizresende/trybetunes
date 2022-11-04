import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    musics: [],
    albumInfo: {},
    requestIsDone: false,
  };

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    this.setState({
      requestIsDone: false,
    });
    const {
      match: {
        params: { id },
      } } = this.props;

    const allInfos = await getMusics(id);
    const albumMusics = allInfos.filter((info) => info.wrapperType !== 'collection');
    this.setState({
      albumInfo: allInfos[0],
      musics: albumMusics,
      requestIsDone: true,
    });
  };

  render() {
    const { albumInfo, musics, requestIsDone } = this.state;
    const albumInfos = (
      <section>
        <h1 data-testid="album-name">{ albumInfo.collectionName }</h1>
        <h2 data-testid="artist-name">{ albumInfo.artistName }</h2>
        <ul>
          {
            musics.map((music) => (
              <MusicCard
                key={ music.trackId }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
              />
            ))
          }
        </ul>
      </section>
    );
    console.log(musics);
    return (
      <div>
        <div data-testid="page-album" className="album">
          <Header />

          {
            !requestIsDone
              ? <Loading />
              : albumInfos
          }
        </div>
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
