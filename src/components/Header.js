import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { MdOutlineSearch, MdOutlineGrade, MdOutlineAccountCircle } from 'react-icons/md';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import '../Style/Header.css';
import logo from '../images/logo.png';

class Header extends React.Component {
  state = {
    loading: true,
    userName: '',
    image: '',
  };

  handleAPI = async () => {
    const info = await getUser();

    this.setState({
      loading: false,
      userName: info.name,
      image: info.image,
    });
  };

  render() {
    const { loading, userName, image } = this.state;
    this.handleAPI();
    return (
      <header data-testid="header-component" className="header">
        <img src={ logo } alt="" className="logo" />
        <div className="navigation">
          <div>
            <MdOutlineSearch />
            <Link data-testid="link-to-search" to="/search">Buscar</Link>
          </div>
          <div>
            <MdOutlineGrade />
            <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
          </div>
          <div>
            <MdOutlineAccountCircle />
            <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
          </div>
        </div>

        {
          loading ? <Loading /> : (
            <div className="user">
              {
                image !== '' ? <img src={ image } alt="" /> : <MdOutlineAccountCircle />
              }
              <p data-testid="header-user-name">{userName}</p>
            </div>
          )
        }
      </header>
    );
  }
}

export default Header;
