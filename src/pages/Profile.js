import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

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
        image,
      });
    });
  };

  render() {
    const { loading, name, email, description, image } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading ? <Loading /> : (
            <section>
              <img data-testid="profile-image" src={ image } alt="" />
              <div>
                <h4>Nome</h4>
                <p>{name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{email}</p>
              </div>
              <div>
                <h4>Descrição</h4>
                <p>{description}</p>
              </div>
              <Link to="/profile/edit">Editar perfil</Link>
            </section>
          )
        }
      </div>
    );
  }
}

export default Profile;
