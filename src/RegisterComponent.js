import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterComponent.css'; // Asegúrate de crear este archivo CSS o reutilizar LoginComponent.css
import registerBasicBot from './assets/img/KOSMO_BOT_BASICO.svg';
import registerUserIcon from './assets/img/LOGO_USER_ICONE.svg';
import registerPasswordIcon from './assets/img/CANDADO.svg';
import registerContainerBackground from './assets/img/FONDO_LOGIN_CONTENEDOR.svg';

const RegisterComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Nuevo estado para confirmar la contraseña
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí va la lógica de registro
    console.log('Registrando con:', email, password, confirmPassword);
    // navigate('/dashboard'); // Opcionalmente redirige al usuario tras el registro exitoso
  };

  return (
    <div className="register-wrapper">
      <img src={registerContainerBackground} alt="Fondo" className="register-container-background" />
      <div className="register-panel">
        <h1>REGÍSTRATE EN TU CUENTA</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <img src={registerUserIcon} alt="User Icon" className="input-icon" />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Correo electrónico"
              className="input-field"
            />
          </div>
          <div className="input-group">
            <img src={registerPasswordIcon} alt="Password Icon" className="input-icon" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Contraseña"
              className="input-field"
            />
          </div>
          <div className="input-group">
            <img src={registerPasswordIcon} alt="Confirm Password Icon" className="input-icon" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirmar Contraseña"
              className="input-field"
            />
          </div>
          <button type="submit" className='registerButton'>Registrar</button>
          <p className="login-register-link">
            ¿Ya tienes una cuenta con Kosmo? <span onClick={() => navigate('/login')}>Inicia sesión aquí</span>
          </p>
        </form>
      </div>
      <div className="register-robot">
        <img src={registerBasicBot} alt="Kosmo Bot" className="floating-robot" />
      </div>
    </div>
  );
};

export default RegisterComponent;
