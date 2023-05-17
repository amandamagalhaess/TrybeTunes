import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    isSearchButtonDisabled: true,
  };

  handleInput = ({ target }) => {
    this.setState(() => (target.value.length >= 2
      ? { isSearchButtonDisabled: false }
      : { isSearchButtonDisabled: true }));
  };

  render() {
    const { isSearchButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <input
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
            onChange={ this.handleInput }
          />
          <button
            data-testid="search-artist-button"
            disabled={ isSearchButtonDisabled }
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
