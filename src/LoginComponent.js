import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginComponent.css';
import loginContainer from './assets/img/LOGIN_PAGE.svg';

const LoginComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="login-component">
      <img src={loginContainer} alt="Login Background" className="login-background" />
      <div className="input-container">
        <input type="text" className="text-input" placeholder="Usuario" />
        <input type="password" className="text-input" placeholder="Contraseña" />
      </div>
      <div className="register-button">
        <button type="button" onClick={() => navigate('/register')}>

        </button>
      </div>
    </div>
  );
};

export default LoginComponent;
