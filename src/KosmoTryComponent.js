import React, { useState } from 'react';
import './KosmoStyles.css'; // Asegúrate de adaptar los estilos al tema de Kosmo
import kosmoLogo from './assets/img/LOGO_BLANCO.svg';

const KosmoTryComponent = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [cel, setCel] = useState('');
  const [fecha, setFecha] = useState('');
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nombre, email, cel, fecha });
    // Aquí integrarías EmailJS u otro servicio de envío de emails si es necesario
    // Resetear el formulario o manejar la respuesta
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    const userMessage = userInput;
    setUserInput(''); // Limpiar el input después de enviar
    addMessageToChat('user', userMessage);

    // Aquí llamarías a la API de OpenAI, reemplaza la URL y el body según sea necesario
    try {
      const response = await fetch('URL_DE_LA_API_DE_CHAT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Agrega aquí otros headers necesarios
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error('Error en la respuesta de la API');

      const data = await response.json();
      addMessageToChat('bot', data.response); // Asume que 'data.response' es la respuesta del bot
    } catch (error) {
      console.error('Error al obtener respuesta:', error);
      addMessageToChat('bot', 'Lo siento, hubo un error procesando tu pregunta.');
    }
  };

  const addMessageToChat = (sender, message) => {
    setMessages((prevMessages) => [...prevMessages, { sender, message }]);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src={kosmoLogo} alt="Logo Kosmo" className="logo" style={{ width: '200px' }} />
      </div>
      <div className="chat-area" id="chatArea">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}-message`}>
            {msg.message}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Escribe tu pregunta aquí..."
          value={userInput}
          onChange={handleInputChange}
        />
        <button onClick={handleSendMessage} className="send-message-button">
        <img
          data-v-6be23ab2=""
          srcSet="https://img.icons8.com/?size=256&id=85940&format=png 1x, https://img.icons8.com/?size=512&id=85940&format=png 2x"
          width="25"
          height="25"
          alt="Send icon"
          className="app-preview__image-origin"
          style={{
            filter: "invert(100%) sepia(0%) saturate(25%) hue-rotate(70deg) brightness(108%) contrast(108%)"
          }}
        />

      </button>
      </div>
      <div className="form-container">
        <h2>Agendar una cita</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre:</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Celular:</label>
            <input type="tel" value={cel} onChange={(e) => setCel(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Fecha deseada:</label>
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
          </div>
          <div className="form-group">
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KosmoTryComponent;
