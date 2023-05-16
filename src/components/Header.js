import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    loading: true,
    userName: '',
  };

  handleAPI = async () => {
    const name = await getUser();

    this.setState({
      loading: false,
      userName: name.name,
    });
  };

  render() {
    const { loading, userName } = this.state;
    this.handleAPI();
    return (
      <header data-testid="header-component">
        <Link data-testid="link-to-search" to="/search">Pesquisar Músicas</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        {
          loading ? <Loading /> : <p data-testid="header-user-name">{userName}</p>
        }
      </header>
    );
  }
}

export default Header;
