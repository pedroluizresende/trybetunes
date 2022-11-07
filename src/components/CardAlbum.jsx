import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CardAlbum extends Component {
  render() {
    const { albumImg, albumName, artistName, collectionId } = this.props;
    return (
      <div className="card-Album">
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img src={ albumImg } alt={ albumName } />
          <h3>{ albumName }</h3>
          <p>{ artistName }</p>
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
