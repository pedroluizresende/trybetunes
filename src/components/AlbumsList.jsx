import React, { Component } from 'react';
import CardAlbum from './CardAlbum';
import searchError from '../images/searchError.png';
import styles from './AlbumsList.module.css';

class AlbumsList extends Component {
  render() {
    const { albums, artistName } = this.props;

    return (
      <ul className={ styles.container }>
        {
          artistName !== '' && <h2>{ `Resultado de álbuns de: ${artistName}`}</h2>
        }
        {
          albums.length === 0
            ? (
              <div className={ styles.searchError }>
                <img src={ searchError } alt="error-icone" />

                <p>Nenhum álbum foi encontrado</p>
              </div>
            )
            : albums.map((album) => (
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
    );
  }
}

AlbumsList.propTypes = {}.iRequired;
export default AlbumsList;
