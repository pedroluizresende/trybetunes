import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './MusicCard.module.css';
import fillHeart from '../images/filled-heart.png';
import emptyHeart from '../images/empty-heart.png';

class MusicCard extends Component {
  state = {
    isFavorite: false,
  };

  componentDidMount() {
    this.setFavorite();
  }

  setFavorite = () => {
    const { favorite } = this.props;
    this.setState({
      isFavorite: favorite,
    });
  };

  render() {
    const { isFavorite } = this.state;
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
      <li className={ styles.card }>
        <p>{ trackName }</p>
        <audio
          className={ styles.audio }
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>

        <button
          type="button"
          className={ styles.favoriteButton }
          onClick={ () => clickChange(Number(trackId), isFavorite) }
        >
          {
            isFavorite
              ? <img src={ fillHeart } alt="Coração preenchido" />
              : <img src={ emptyHeart } alt="Coração vazio" />
          }
        </button>
      </li>
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
  favorite: PropTypes.bool.isRequired,
};

export default MusicCard;
