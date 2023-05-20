import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../Style/Login.css';
import logo from '../images/logo.png';

class Login extends React.Component {
  state = {
    isLoginButtonDisabled: true,
    userNameInput: '',
    userName: '',
    loading: false,
    redirect: false,
  };

  activateButton = ({ target }) => {
    const minLength = 3;
    this.setState(() => (target.value.length >= minLength
      ? { isLoginButtonDisabled: false, userNameInput: target.value }
      : { isLoginButtonDisabled: true }));
  };

  handleLoginButton = () => {
    const { userNameInput } = this.state;
    this.setState(
      { loading: true, userName: userNameInput },
      async () => {
        const { userName } = this.state;
        await createUser({ name: userName });
        this.setState(({
          redirect: true,
          loading: false,
        }));
      },
    );
  };

  render() {
    const { isLoginButtonDisabled, loading, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login" className="page-login">
        {
          loading ? <Loading /> : (
            <div>
              <img src={ logo } alt="" />
              <input
                data-testid="login-name-input"
                placeholder="Digite seu nome"
                onChange={ this.activateButton }
              />
              <button
                data-testid="login-submit-button"
                disabled={ isLoginButtonDisabled }
                onClick={ this.handleLoginButton }
              >
                Entrar
              </button>
            </div>
          )
        }

      </div>
    );
  }
}

export default Login;
