import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../Style/Favorites.css';

class Favorites extends React.Component {
  state = {
    favorites: [],
  };

  componentDidMount() {
    this.callAPI();
  }

  callAPI = () => {
    this.setState({ favorites: undefined }, async () => {
      const favorites = await getFavoriteSongs();
      this.setState({
        favorites,
      });
    });
  };

  render() {
    const { favorites } = this.state;
    return (
      <div data-testid="page-favorites" className="page-favorites">
        <Header />
        <div className="songs-section">
          <div className="songs-header">
            <h1>Músicas Favoritas</h1>
          </div>
          <div className="songs-container">
            { favorites
              ? favorites.map((favorite) => (
                <MusicCard
                  key={ favorite.trackId }
                  music={ favorite }
                  favorites={ favorites }
                  callback={ this.callAPI }
                />)) : <Loading />}
          </div>
        </div>

      </div>
    );
  }
}

export default Favorites;
