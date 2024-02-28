import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './CardAbum.module.css';

class CardAlbum extends Component {
  render() {
    const MAX_LENGTH = 20;
    const { albumImg, albumName, artistName, collectionId } = this.props;

    const editAlbumName = albumName.length > MAX_LENGTH ? `${albumName
      .slice(0, MAX_LENGTH)}...` : albumName;

    const editArtistName = artistName.length > MAX_LENGTH ? `${artistName
      .slice(0, MAX_LENGTH)}...` : artistName;

    return (
      <div className={ styles.card }>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img src={ albumImg } alt={ albumName } />
          <h3>{ editAlbumName }</h3>
          <p>{ editArtistName }</p>
        </Link>
      </div>
    );
  }
}

CardAlbum.propTypes = {
  albumImg: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};

export default CardAlbum;
