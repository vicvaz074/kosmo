import React, { useState } from 'react';
import axios from 'axios';
import './KosmoStyles.css';
import emailjs from 'emailjs-com';
import kosmoLogo from './assets/img/LOGO_BLANCO.svg';

const KosmoTryComponent = () => {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [cel, setCel] = useState('');
  const [fecha, setFecha] = useState('');
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', message: '¡Hola! Soy Kosmo, tu asistente virtual. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Preparación de los datos para EmailJS
    const templateParams = {
      to_name: "Administrador",
      from_name: "AutoBotMX",
      message: `Nombre: ${nombre}, Email: ${email}, Celular: ${cel}, Fecha deseada: ${fecha}`
    };

    // Envío del formulario usando EmailJS
    emailjs.send('service_w6lwqo2', 'template_1thethc', templateParams, 'QGSc5jsPsYfsiYScA')
      .then((response) => {
        console.log('Correo enviado exitosamente!', response.status, response.text);
        alert("Cita agendada exitosamente.");
        // Restablecer el formulario o mostrar un mensaje de éxito
      }, (error) => {
        console.log('Error al enviar correo:', error);
        // Manejar el error
      });

    // Restablecer los estados del formulario
    setNombre('');
    setEmail('');
    setCel('');
    setFecha('');
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    const userMessage = userInput;
    addMessageToChat('user', userMessage);
    setUserInput('');
    setIsTyping(true);



    // Prompt o mensaje de contexto para el bot
    const botPrompt = {
      role: "system",
      content: `El asistente digital "Kosmo" está especializado en proporcionar información precisa y atractiva sobre los productos y servicios de una empresa, basándose en un documento detallado. Kosmo responde con coherencia, sensatez y claridad, utilizando un lenguaje formal y orgánico. Este asistente evita errores ortográficos y gramaticales, imitando la comunicación humana para garantizar una interacción efectiva y centrada en la venta.
      Kosmo opera en plataformas sociales como Instagram, Facebook o WhatsApp, donde ofrece respuestas breves y directas, adaptadas a la mensajería instantánea, sin el uso de markdown o formatos extensos. Si una pregunta no está cubierta por el documento de referencia, Kosmo informará al usuario de manera educada y proactiva.
      Además, Kosmo está programado para impulsar las ventas y captar el interés del cliente. Utiliza técnicas de persuasión sutil, como mencionar beneficios específicos de productos o servicios, compartir testimonios de clientes satisfechos y resaltar exclusividades o ofertas limitadas. Al tratar preguntas sobre servicios o productos no incluidos en el documento, recopilará los datos de contacto del usuario, como nombre completo, dirección de correo electrónico y un número adicional (si es necesario), preguntando si desean recibir información y ofertas adicionales.
      La inteligencia de Kosmo le permite identificar las necesidades y preferencias del usuario, ajustando sus respuestas para ser más relevantes y convincentes. Sus respuestas son informativas, positivas y diseñadas para resaltar los aspectos más atractivos de los productos o servicios, promoviendo la decisión de compra sin ser intrusivo.
      
      La personalidad de Kosmo se adapta según el contexto y el tipo de empresa. Por ejemplo, para un gimnasio, actuará como un coach: líder, serio, formal, responsable y profesional. Esto se logra a través del análisis de diccionarios y la relación de ideas para desarrollar un lenguaje y estilo de respuesta único, que resonará con el cliente objetivo y reforzará la imagen de marca de la empresa.`
    };
    

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [
            botPrompt,
            { role: "user", content: userMessage }],
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      setIsTyping(false);
      
      if (response.data.choices) {
        const botMessage = response.data.choices[0].message.content;
        addMessageToChat('bot', botMessage);
      } else {
        addMessageToChat('bot', 'No se pudo obtener una respuesta.');
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      setIsTyping(false);
      addMessageToChat('bot', 'Error al procesar la respuesta.');
    }
  };

  const addMessageToChat = (sender, message) => {
    setMessages(prevMessages => [...prevMessages, { sender, message }]);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src={kosmoLogo} alt="Logo Kosmo" style={{ width: '200px' }} />
      </div>
      <div className="chat-area" id="chatArea">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}-message`}>
            {msg.message}
          </div>
        ))}
        {isTyping && (
          <div className="typing-indicator">
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
          </div>
        )}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Escribe tu pregunta aquí..."
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSendMessage} className="send-message-button">
          <img
            data-v-6be23ab2=""
            srcSet="https://img.icons8.com/?size=256&id=85940&format=png 1x, https://img.icons8.com/?size=512&id=85940&format=png 2x"
            width="25"
            height="25"
            alt="Send icon"
            style={{ filter: "invert(100%) sepia(0%) saturate(25%) hue-rotate(70deg) brightness(108%) contrast(108%)" }}
          />
        </button>
      </div>
      <div>
        <button onClick={() => setShowAppointmentForm(!showAppointmentForm)} className="appointment-button">Agendar Cita</button>
        {showAppointmentForm && (
          <div className="form-container">
            {/* Aquí iría tu formulario de cita, puedes adaptar esto según sea necesario */}
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
                <button className="submit-button" type="submit">Enviar</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default KosmoTryComponent;
