import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

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
      <div data-testid="page-favorites">
        <Header />
        { favorites
          ? favorites.map((favorite) => (
            <MusicCard
              key={ favorite.trackId }
              music={ favorite }
              favorites={ favorites }
              callback={ this.callAPI }
            />)) : <Loading />}
      </div>
    );
  }
}

export default Favorites;
