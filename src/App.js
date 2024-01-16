import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import logo from './assets/img/RESPONSIVE_AZUL.png';
import kosmoLogo from './assets/img/KOSMO_AZUL.svg';
import earth from './assets/img/TIERRA.png';
import ship from './assets/img/NAVE.png';
import aboutVideo from './assets/videos/NOSOTROS.mp4';

function App() {
  const [isHovering, setIsHovering] = useState(false);
  const [navExpanded, setNavExpanded] = useState(false);

  useEffect(() => {
    const updateContentMargin = () => {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        mainContent.style.marginTop = `${navbarHeight}px`;
      }
    };

    window.addEventListener('resize', updateContentMargin);
    updateContentMargin();

    return () => window.removeEventListener('resize', updateContentMargin);
  }, [navExpanded]);

  const toggleNav = () => {
    setNavExpanded(!navExpanded);
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <div
            className="navbar-brand"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onTouchStart={() => setIsHovering(true)}
            onTouchEnd={() => setIsHovering(false)}
          >
            {isHovering ? (
              <span className="navbar-text-logo">Kosmo</span>
            ) : (
              <img src={logo} alt="Logo Kosmo" className="brand-logo" />
            )}
          </div>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNav}
            aria-controls="navbarNav"
            aria-expanded={navExpanded}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${navExpanded ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/#inicio">Inicio</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/#nosotros">Nosotros</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/#planes">Planes</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/#contactanos">Contáctanos</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/registrarse">Registrarse</NavLink>
              </li>
            </ul>
          </div>
          </div>
      </nav>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/registrarse" element={<RegisterComponent />} />
      </Routes>
    </Router>
  );
}

function MainPage() {
  useEffect(() => {
    const starsContainer = document.querySelector('.stars-container');
    createStars(starsContainer, 100);
  }, []);

  function createStars(container, numberOfStars) {
    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const xPos = Math.random() * 100;
      const yPos = Math.random() * 100;
      const starSize = Math.random() * (0.2 - 0.1) + 0.1;

      star.style.left = `${xPos}vw`;
      star.style.top = `${yPos}vh`;
      star.style.width = `${starSize}vw`;
      star.style.height = `${starSize}vw`;

      container.appendChild(star);
    }
  }

  return (
    <div className="main-page">
      <div id="inicio" className="main-content">
        <img src={kosmoLogo} alt="Kosmo Logo" className="kosmo-logo" style={{ width: '700px' }} />
        <h2>CONOCE Y ÚNETE A KOSMO</h2>
        <p>Un chatbot de otro planeta</p>
        <button className="button">Hablar con Kosmo</button>
        {/* Aquí puedes agregar más contenido para la sección Inicio */}
      </div>
      <div className="space-container">
        <div className="stars-container"></div>
        <div className="ship-orbit">
          <img src={ship} alt="Nave Espacial" className="ship" />
        </div>
        <img src={earth} alt="Media planeta" className="earth" />
      </div>
      <div id="nosotros" className="section-nosotros">
      <h2>Estrategia Trifásica de KOSMOS: Revolucionando la Era de los Chatbots</h2>
      <video src={aboutVideo} controls className="about-video"></video>

      <div className="etapa-container">
        <div className="etapa">
          <h3>Primera Etapa: Introducción y Penetración en el Mercado</h3>
          <p>Establecer Presencia: Posicionar a KOSMOS como un referente innovador...</p>
          {/* Más contenido de la Primera Etapa */}
        </div>

        <div className="etapa">
          <h3>Segunda Etapa: Consolidación y Expansión del Servicio</h3>
          <p>Enfoque en Diseño y Storytelling: Mover el foco hacia la creación...</p>
          {/* Más contenido de la Segunda Etapa */}
        </div>

        <div className="etapa">
          <h3>Tercera Etapa: Personalización y Emotividad en el Diseño</h3>
          <p>Personalización Profunda: Convertir el diseño de chatbots en una experiencia...</p>
          {/* Más contenido de la Tercera Etapa */}
        </div>
      </div>

      <div className="conclusion">
        <h3>Conclusión</h3>
        <p>La estrategia trifásica de KOSMOS no solo sitúa a la marca como un pionero...</p>
      </div>
    </div>

      <div id="planes">
        {/* Aquí va el contenido de la sección Planes */}
      </div>
      <div id="contactanos">
        {/* Aquí va el contenido de la sección Contáctanos */}
      </div>
      <div className="footer">
        <p>© Kosmo. Todos los derechos reservados.</p>
      </div>
    </div>
  );
}

export default App;
