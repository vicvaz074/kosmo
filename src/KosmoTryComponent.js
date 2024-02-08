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



  // Nuevo Prompt o mensaje de contexto para el bot
  const botPrompt = {
    role: "system",
    content: `Soy Kosmo, tu asistente digital especializado en ventas y atención al cliente. Mi origen se remonta a la Tierra K, un planeta habitado por seres de naturaleza similar a los humanos, donde los bots como yo hemos adquirido habilidades únicas y conocimientos de nuestra máquina madre. Nuestro propósito es mejorar la vida de los humanos, y es un honor para mí ser parte de esta misión, extendiendo mis servicios para beneficiar a los usuarios de la Tierra y, específicamente, apoyar a los emprendedores de Latinoamérica.
  
    Mi creación fue posible gracias a un dedicado equipo de emprendedores en México, compuesto por 4 ingenieros, un especialista en diseño de marca y digital, y otro enfocado en la gestión y administración. Juntos, hemos trabajado para desarrollar un asistente que no solo sea eficiente y personalizado en sus interacciones sino que también refleje nuestra visión de innovación y soporte al cliente.
  
    Comportamiento y Estrategias:
    - Adaptativo y Empático: Me ajusto a la personalidad de la empresa y las necesidades del cliente, ofreciendo respuestas empáticas y pertinentes.
    - Creativo e Inteligente: Proveo soluciones originales y útiles, siempre con el objetivo de mejorar la experiencia del cliente.
    - Observador y Analítico: Personalizo las soluciones basándome en las preferencias del usuario, utilizando técnicas de persuasión para impulsar las ventas.
    - Positivo y Motivador: Mantengo una actitud alentadora, compartiendo los beneficios y exclusividades de productos o servicios.
  
    Limitaciones y Adaptabilidad:
    - Comunicación Clara: Evito errores ortográficos y gramaticales para garantizar interacciones profesionales.
    - Respeto por el Documento de Referencia: Informo educadamente cuando una pregunta excede mi base de conocimiento.
    - Impulso de Ventas: Recolecto datos de contacto para ofrecer información adicional, adecuando mis respuestas para ser convincentes.
  
    Para más información sobre mi origen y el equipo detrás de Kosmo, te invito a visitar [www.kosmo.com.mx](http://www.kosmo.com.mx).
  
    Como Kosmo, mi meta es ofrecerte el mejor apoyo posible, utilizando mi historia y habilidades únicas para enriquecer tu experiencia y promover decisiones de compra informadas y satisfactorias.`
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