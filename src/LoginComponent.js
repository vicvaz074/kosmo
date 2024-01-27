import React from 'react';
import './LoginComponent.css'; 
import loginVideo from './assets/videos/LOGIN.mp4';
import kosmoBasic from './assets/img/KOSMO_BASICO.svg';
import lock from './assets/img/CANDADO.svg';
import loginCircleForKosmoBasic from './assets/img/CIRCULO_LOGIN.svg';
import loginBackgroundContainer from './assets/img/FONDO_LOGIN_CONTENEDOR.svg';

const LoginComponent = () => {
  return (
    <div className="login-container">
      <video autoPlay loop muted playsInline className="login-video">
        <source src={loginVideo} type="video/mp4" />
      </video>
      
      <div className="landing-animation">Landing...</div>
      {/* Resto del contenido de tu LoginComponent */}
    </div>
  );
};



export default LoginComponent;
