import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    isFavorite: false,
    favorites: undefined,
  };

  componentDidMount() {
    this.callAPI();
  }

  callAPI = () => {
    this.setState({ loading: false }, async () => {
      const favorites = await getFavoriteSongs();
      this.setState({
        favorites,
      });
    });
  };

  handleFavorites = ({ target }) => {
    const { music } = this.props;
    if (target.checked) {
      this.setState({ loading: true, isFavorite: true }, async () => {
        await addSong(music);
        this.setState({
          loading: false,
        });
      });
    }
  };

  render() {
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;
    const { loading, isFavorite, favorites } = this.state;
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
                    .find((favorite) => favorite.trackId === trackId) !== undefined ? (
                      <input
                        type="checkbox"
                        data-testid={ `checkbox-music-${trackId}` }
                        onChange={ this.handleFavorites }
                        checked
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
};

export default MusicCard;
