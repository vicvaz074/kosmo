import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginComponent.css';
import loginBasicBot from './assets/img/KOSMO_BOT_BASICO.svg';
import loginUserIcone from './assets/img/LOGO_USER_ICONE.svg';
import loginPasswordIcone from './assets/img/CANDADO.svg';
import loginContainerBackground from './assets/img/FONDO_LOGIN_CONTENEDOR.svg';


const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí va la lógica de inicio de sesión
    console.log('Iniciando sesión con:', email, password);
    // navigate('/dashboard'); // Redirige al usuario tras el inicio de sesión exitoso
  };

  return (
    <div className="login-wrapper">
      <img src={loginContainerBackground} alt="Fondo" className="login-container-background" />
      <div className="login-panel">
        <h1>INICIA SESIÓN EN TU CUENTA</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <img src={loginUserIcone} alt="User Icon" className="input-icon" />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Usuario"
              className="input-field"
            />
          </div>
          <div className="input-group">
            <img src={loginPasswordIcone} alt="Password Icon" className="input-icon" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Contraseña"
              className="input-field"
            />
          </div>
          <button type="submit" className='loginButton'>Iniciar Sesión</button>
          <p className="login-register-link">
            ¿No trabajas con Kosmo? <span onClick={() => navigate('/registrarse')}>Regístrate aquí</span>
          </p>
          <div className="login-robot">
            <img src={loginBasicBot} alt="Kosmo Bot" className="floating-robot" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
