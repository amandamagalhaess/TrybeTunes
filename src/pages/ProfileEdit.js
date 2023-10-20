import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import '../Style/ProfileEdit.css';

class ProfileEdit extends React.Component {
  state = {
    loading: true,
    nome: '',
    email: '',
    description: '',
    image: '',
    isButtonDisabled: true,
    saved: false,
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
        nome: name,
        email,
        description,
        image: image || 'https://files.cercomp.ufg.br/weby/up/1316/o/user.png?1638298920',
      });
      this.setState(() => (name && email && description && image
        ? { isButtonDisabled: false } : { isButtonDisabled: true }));
    });
  };

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });

    this.setState((prevState) => {
      const { nome, email, description, image } = prevState;

      return nome && email && description && image
        ? { isButtonDisabled: false } : { isButtonDisabled: true };
    });
  };

  handleSaveButton = () => {
    const { nome, email, image, description } = this.state;

    this.setState({ loading: true }, async () => {
      await updateUser({ name: nome, email, image, description });
      this.setState({ loading: false, saved: true });
    });
  };

  render() {
    const
      { loading, nome, email, description, image, isButtonDisabled, saved } = this.state;
    return (
      <div data-testid="page-profile-edit" className="page-profile-edit">
        <Header />
        {
          loading ? <Loading /> : (
            <form className="profile-edit-content">
              <div className="blue-content">
                <div>
                  <img src={ image } alt="" />
                </div>
                <input
                  data-testid="edit-input-image"
                  type="text"
                  placeholder="Insira um link"
                  name="image"
                  onChange={ this.handleChange }
                  required
                />
              </div>
              <div className="gray-content">
                <div>
                  <h4>Nome</h4>
                  <p style={ { fontSize: 12 } }>
                    Fique à vontade para usar seu nome social
                  </p>
                  <input
                    data-testid="edit-input-name"
                    type="text"
                    placeholder="Digite seu nome"
                    value={ nome }
                    name="nome"
                    onChange={ this.handleChange }
                    required
                  />
                </div>
                <div>
                  <h4>E-mail</h4>
                  <p style={ { fontSize: 12 } }>
                    Escolha um e-mail que consulte diariamente
                  </p>
                  <input
                    data-testid="edit-input-email"
                    type="email"
                    placeholder="usuario@usuario.com"
                    value={ email }
                    name="email"
                    onChange={ this.handleChange }
                    required
                  />
                </div>
                <div>
                  <h4>Descrição</h4>
                  <textarea
                    data-testid="edit-input-description"
                    placeholder="Sobre mim"
                    value={ description }
                    name="description"
                    onChange={ this.handleChange }
                    required
                  />
                </div>
                <button
                  type="button"
                  data-testid="edit-button-save"
                  disabled={ isButtonDisabled }
                  onClick={ this.handleSaveButton }
                >
                  Salvar
                </button>
              </div>

            </form>
          )
        }

        {
          saved && <Redirect to="/profile" />
        }
      </div>
    );
  }
}

export default ProfileEdit;
