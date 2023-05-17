import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    loading: true,
    albumInfo: undefined,
    musics: undefined,
  };

  componentDidMount() {
    this.callAPI();
  }

  callAPI() {
    const { match } = this.props;

    this.setState({ loading: true }, async () => {
      const album = await getMusics(match.params.id);
      this.setState({
        loading: false,
        albumInfo: album[0],
        musics: album.filter((item) => item.wrapperType === 'track'),
      });
    });
  }

  render() {
    const { loading, albumInfo, musics } = this.state;
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
