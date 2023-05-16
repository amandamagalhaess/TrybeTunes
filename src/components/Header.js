import React from 'react';
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
        {
          loading ? <Loading /> : <p data-testid="header-user-name">{userName}</p>
        }
      </header>
    );
  }
}

export default Header;
