import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import KosmoTryComponent from './KosmoTryComponent';
import logo from './assets/img/LOGO_AZULOSC.svg';
import kosmoLogo from './assets/img/KOSMO_AZUL.svg';
import kosmoOxxo from './assets/img/KOSMO_OXXO.svg';
import kosmoBasic from './assets/img/KOSMO_BASICO.svg';
import kosmoConstructor from './assets/img/KOSMO_CONSTRUCTOR.svg';
import earth from './assets/img/PLANETA.png';
import ship from './assets/img/NAVE.png';
import aboutVideo from './assets/videos/NOSOTROS.mp4';
import Carousel from 'react-bootstrap/Carousel';
import kosmoBotBasico from './assets/img/KOSMO_BOT_BASICO.svg';
import outfitRed from './assets/img/CONJUNTO_ROJO.svg';
import outfitBlue from './assets/img/CONJUNTO_AZUL.svg';
import outfitYellow from './assets/img/CONJUNTO_AMARILLO.svg';


const KosmoCustomizationComponent = () => {
  const [outfitIndex, setOutfitIndex] = useState(0);
  const outfits = [outfitRed, outfitBlue, outfitYellow];
  const [isChanging, setIsChanging] = useState(false);
  

  const previousOutfitIndex = (outfitIndex - 1 + outfits.length) % outfits.length;
  const nextOutfitIndex = (outfitIndex + 1) % outfits.length;

  // Función para manejar el cambio de outfit y disparar la animación
  const changeOutfit = (newIndex) => {
    setIsChanging(true); // Inicia la animación
    setTimeout(() => {
      setOutfitIndex(newIndex);
      setIsChanging(false); // Restablece el estado de animación después de que termine
    }, 500); // Asegúrate de que este tiempo coincida con la duración de la animación CSS
  };

  return (
    <div className="kosmo-customization-section">
      <button onClick={() => changeOutfit(previousOutfitIndex)}>{"<"}</button>
      <img src={outfits[previousOutfitIndex]} alt="Previous Outfit" className="kosmo-outfit side-outfit" />
      <div className="center-outfit">
        <img src={kosmoBotBasico} alt="Kosmo Bot Básico" className="kosmo-bot" />
        <img src={outfits[outfitIndex]} alt="Current Outfit" className={`kosmo-outfit ${isChanging ? 'animate-change' : ''}`} />
      </div>
      <img src={outfits[nextOutfitIndex]} alt="Next Outfit" className="kosmo-outfit side-outfit" />
      <button onClick={() => changeOutfit(nextOutfitIndex)}>{">"}</button>
    </div>
  );
};



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
                <NavLink className="nav-link" to="/#custom">Personalizar</NavLink>
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
        <Route path="/tryme" element={<KosmoTryComponent />} />
      </Routes>
    </Router>
  );
}



function MainPage() {
  const location = useLocation();
  const navigate = useNavigate(); // Agrega esta línea
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setActiveIndex(selectedIndex);
  };

  useEffect(() => {
    const handleScrollToSection = () => {
      const { hash } = window.location;
      if (hash !== '') {
        setTimeout(() => {
          const section = document.querySelector(hash);
          if (section) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const position = section.offsetTop - navbarHeight;
            window.scrollTo({
              top: position,
              behavior: 'smooth',
            });
          }
        }, 0);
      }
    };

    if (location.pathname === '/') {
      handleScrollToSection();
    }
  }, [location]);
  
  useEffect(() => {
    const starsContainer = document.querySelector('.stars-container');
    createStars(starsContainer, 120);
  }, []);

  function createStars(container, numberOfStars) {
    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const xPos = Math.random() * 100;
      const yPos = Math.random() * 100;
      const starSize = Math.random() * (0.2 - 0.1) + 0.1;

      star.style.left = `${xPos}vw`;
      star.style.top = `${yPos}vw`;
      star.style.width = `${starSize}vw`;
      star.style.height = `${starSize}vw`;

      container.appendChild(star);
    }
  }

    return (
      <div className="main-page">
        <div id="inicio" className="main-content">
          <img src={kosmoLogo} alt="Kosmo Logo" className="kosmo-logo" style={{ width: '900px' }} />
          <h2>UN CHATBOT DE OTRO PLANETA</h2>
          <p>Únete y conócelo</p>
          <button className="button" onClick={() => navigate('/tryme')}>Hablar con Kosmo</button>
        </div>
        <div className="space-container">
          <div className="stars-container"></div>
          <div className="ship-orbit">
            <img src={ship} alt="Nave Espacial" className="ship" />
          </div>
          <img src={earth} alt="Media planeta" className="earth" />
        </div>
        <div id="nosotros" className="section-nosotros">
          <h2 className="nosotros-title">¿QUIÉNES SOMOS? CONOCE NUESTRA HISTORIA Y ÚNETE A NUESTRA ESTRATEGIA</h2>
          <Carousel activeIndex={activeIndex} onSelect={handleSelect} interval={null}>
            <Carousel.Item>
              <video className="d-block w-100" controls>
                <source src={aboutVideo} type="video/mp4" />
              </video>
            </Carousel.Item>
            <Carousel.Item>
              <div className="carousel-strategy-container">
                <h4 className="strategy-title">NUESTRA ESTRATEGIA TRIFÁSICA</h4>
                <div className="strategy-point">
                  <h5>LA IMPORTANCIA DE LOS BOTS</h5>
                  <p>En Kosmo, entendemos que los chatbots son más que simples programas...</p>
                </div>
                <div className="strategy-point">
                  <h5>EL ORIGEN DE NUESTRA IDEA</h5>
                  <p>Kosmo nace de necesidad clara...</p>
                </div>
                <div className="strategy-point">
                  <h5>NUESTRO EQUIPO</h5>
                  <p>Compuesto por innovadores, desarrolladores y creativos...</p>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
        <div id="planes" className="planes-section">
          <h3>NUESTROS PLANES</h3>
          <div className="planes-cards">
            <div className="card">
              <img src={kosmoBasic} className="card-img-top" alt="Kosmo Basic"/>
              <div className="card-body">
                <h5 className="card-title">KOSMO BASIC</h5>
                <p className="card-text">Un chatbot personal, toda la inteligencia...</p>
              </div>
            </div>
            <div className="card">
              <img src={kosmoOxxo} className="card-img-top" alt="Kosmo Oxxo" />
              <div className="card-body">
                <h5 className="card-title">KOSMO PRO</h5>
                <p className="card-text">Un chatbot personal, se pone la camiseta y aprovechas toda su inteligencia...</p>
              </div>
            </div>
            <div className="card">
              <img src={kosmoConstructor} className="card-img-top" alt="Kosmo Constructor" />
              <div className="card-body">
                <h5 className="card-title">KOSMO PRO PLUS</h5>
                <p className="card-text">Un chatbot personalizable, se pone la camiseta y otra herramienta extra, con toda su inteligencia incluida.</p>
              </div>
            </div>
          </div>
        </div>
        {/* Sección de personalización de Kosmo */}
        <div id="custom" className="customization-section">
          <h2>¡SERVICIO COMPLETO DE PERSONALIZACIÓN!</h2>
          <KosmoCustomizationComponent />
          <p className="customization-description">
            PUEDES ELEGIR ENTRE CAMBIAR SU ASPECTO, AGREGAR PROPS QUE FORTALEZCAN SU
            PERSONALIDAD O CAMBIAR EL ESTILO EN QUE ESTE SE COMUNICA
            <span className="service-notice">
              *Para acceder a todas estas funciones, asegúrate de contar con el servicio de pago adecuado.
            </span>
          </p>
        </div>
        <div className="footer">
          <p>© Kosmo. Todos los derechos reservados.</p>
        </div>
      </div>
    );
  }

export default App;
