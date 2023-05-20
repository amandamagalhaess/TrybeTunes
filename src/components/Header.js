import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import '../Style/Header.css';
import logo from '../images/logo.png';

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
      <header data-testid="header-component" className="header">
        <img src={ logo } alt="" />
        <div className="navigation">
          <Link data-testid="link-to-search" to="/search">Buscar</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </div>

        {
          loading ? <Loading /> : (
            <div className="user">
              <p data-testid="header-user-name">{userName}</p>
            </div>)
        }
      </header>
    );
  }
}

export default Header;
