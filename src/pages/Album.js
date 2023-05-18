import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    loading: true,
    albumInfo: undefined,
    musics: undefined,
    favorites: [],
  };

  componentDidMount() {
    this.callAPI();
  }

  callAPI = () => {
    const { match } = this.props;

    this.setState({ loading: true }, async () => {
      const album = await getMusics(match.params.id);
      const favorites = await getFavoriteSongs();
      this.setState({
        loading: false,
        albumInfo: album[0],
        musics: album.filter((item) => item.wrapperType === 'track'),
        favorites,
      });
    });
  };

  render() {
    const { loading, albumInfo, musics, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          loading ? <Loading /> : (
            <section>
              <div>
                <img src={ albumInfo.artworkUrl100 } alt="" />
                <h4 data-testid="album-name">{albumInfo.collectionName}</h4>
                <p data-testid="artist-name">{albumInfo.artistName}</p>
              </div>

              <div>
                {
                  musics
                    .map((music) => (<MusicCard
                      key={ music.trackId }
                      music={ music }
                      favorites={ favorites }
                      callback={ this.callAPI }
                    />))
                }
              </div>
            </section>
          )
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
