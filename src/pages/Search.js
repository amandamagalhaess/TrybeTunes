import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import Card from '../components/Card';

class Search extends React.Component {
  state = {
    isSearchButtonDisabled: true,
    artistName: '',
    loading: false,
  };

  handleInput = ({ target }) => {
    this.setState(() => (target.value.length >= 2
      ? { isSearchButtonDisabled: false }
      : { isSearchButtonDisabled: true }));
  };

  handleButton = () => {
    const input = document.querySelector('input');

    this.setState({ artistName: input.value, loading: true }, async () => {
      const { artistName } = this.state;
      const response = await searchAlbumsAPI(artistName);

      this.setState({
        loading: false,
        APIresponse: response,
      });
    });

    input.value = '';
  };

  render() {
    const { isSearchButtonDisabled, artistName, loading, APIresponse } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading />
          : (
            <div>
              <input
                data-testid="search-artist-input"
                placeholder="Nome do Artista"
                onChange={ this.handleInput }
              />
              <button
                data-testid="search-artist-button"
                disabled={ isSearchButtonDisabled }
                onClick={ this.handleButton }
              >
                Pesquisar
              </button>
            </div>
          )}

        {
          APIresponse && APIresponse.length > 0 && (
            <section>
              <h2>
                Resultado de álbuns de:
                {' '}
                {artistName}
              </h2>

              <div>
                {
                  APIresponse
                    .map((item) => <Card key={ item.collectionId } album={ item } />)
                }
              </div>
            </section>
          )
        }

        {
          APIresponse && APIresponse.length === 0 && <p>Nenhum álbum foi encontrado</p>
        }

      </div>
    );
  }
}

export default Search;
