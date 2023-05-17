import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { music } = this.props;
    return (
      <div>
        <span>{music.trackName}</span>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
