import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../Style/Profile.css';

class Profile extends React.Component {
  state = {
    loading: true,
    name: '',
    email: '',
    description: '',
    image: '',
  };

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    this.setState({ loading: true }, async () => {
      const userInfo = await getUser();
      const { name, email, description, image } = userInfo;
      this.setState({
        loading: false,
        name,
        email,
        description,
        image: image || 'https://files.cercomp.ufg.br/weby/up/1316/o/user.png?1638298920',
      });
    });
  };

  render() {
    const { loading, name, email, description, image } = this.state;
    return (
      <div data-testid="page-profile" className="page-profile">
        <Header />
        {
          loading ? <Loading /> : (
            <section className="profile-content">
              <div className="blue-content">
                <div>
                  <img data-testid="profile-image" src={ image } alt="" />
                </div>
              </div>
              <div className="gray-content">
                <div style={ { width: 400 } }>
                  <h4>Nome</h4>
                  <p>{name}</p>
                </div>
                <div style={ { width: 400 } }>
                  <h4>E-mail</h4>
                  <p>{email}</p>
                </div>
                <div style={ { width: 400 } }>
                  <h4>Descrição</h4>
                  <p>{description}</p>
                </div>
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
            </section>
          )
        }
      </div>
    );
  }
}

export default Profile;
