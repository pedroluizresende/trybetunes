import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const {
      music,
      clickChange,
    } = this.props;

    const {
      trackName,
      previewUrl,
      trackId,
    } = music;

    return (
      <div className="music-card">
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="checkbox-music">
          <input
            id="checkbox-music"
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ () => clickChange(music) }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  clickChange: PropTypes.func.isRequired,
};

export default MusicCard;
