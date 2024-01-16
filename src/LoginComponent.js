// LoginComponent.js
import React from 'react';
import loginVideo from './assets/videos/LOGIN.mp4';


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
