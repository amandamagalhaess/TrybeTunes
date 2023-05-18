import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
// import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    isFavorite: false,
    isAlredyFavorite: true,
  };

  handleFavorites = ({ target }) => {
    const { music, callback } = this.props;
    if (target.checked) {
      this.setState(
        { loading: true, isFavorite: true },
        async () => {
          await addSong(music);
          callback();
          this.setState({
            loading: false,
          });
        },
      );
    } else {
      this.setState({ loading: true, isFavorite: false }, async () => {
        await removeSong(music);
        callback();
        this.setState(() => ({
          loading: false,
          isAlredyFavorite: false,
        }));
      });
    }
  };

  render() {
    const { music, favorites } = this.props;
    const { trackName, previewUrl, trackId } = music;
    const { loading, isFavorite, isAlredyFavorite } = this.state;
    return (
      <div>
        {
          loading ? <Loading /> : (
            <div>
              <span>{trackName}</span>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <label>
                Favorita
                {
                  favorites
                  && favorites
                    .find((favorite) => favorite.trackId === trackId) !== undefined
                    ? (
                      <input
                        type="checkbox"
                        data-testid={ `checkbox-music-${trackId}` }
                        onChange={ this.handleFavorites }
                        checked={ isAlredyFavorite }
                      />
                    )
                    : (
                      <input
                        type="checkbox"
                        data-testid={ `checkbox-music-${trackId}` }
                        onChange={ this.handleFavorites }
                        checked={ isFavorite }
                      />
                    )
                }
              </label>
            </div>
          )
        }
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
  favorites: PropTypes.arrayOf(PropTypes.shape({
    trackId: PropTypes.number,
  })).isRequired,
  callback: PropTypes.func.isRequired,
};

export default MusicCard;
