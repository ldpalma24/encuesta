import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { slideVariants } from './variants';

// Estilos del ticket
const ticketStyles = `
  .ticket {
    border-radius: 12px;
    display: inline-block;
    max-width: 320px;
    text-align: left;
    text-transform: uppercase;
    width: 100%;
    height: 306px;
    width: 320px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .ticket.light {
    background-color: white;
    color: #333;
  }

  .ticket-head {
    background-position: center;
    background-size: cover;
    border-radius: 12px 12px 0 0;
    color: white;
    height: 140px;
    position: relative;
  }

  .ticket-head .layer {
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 12px 12px 0 0;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
  }

  .ticket-title {
    font-family: "Poppins", sans-serif;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    font-weight: 600;
    width: 100%;
    z-index: 2;
    text-align: center;
  }

  .ticket-body {
    padding: 15px 35px;
    position: relative;
  }

  .ticket-body p {
    color: #666;
    font-size: 12px;
    margin-top: 5px;
  }

  .ticket-info {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
  }

  .ticket-date {
    font-size: 12px;
    margin-top: 10px;
    color: #666;
  }

  .codigo-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .codigo-logo {
    width: 40px;
    height: auto;
  }

  .btn-circle-download {
    position: relative;
    height: 48px;
    width: 48px;
    margin: 20px auto 0;
    border-radius: 100%;
    background: #E8EAED;
    cursor: pointer;
    overflow: visible;
    transition: all .2s ease;
  }

  .btn-circle-download svg {
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
  }

  .btn-circle-download svg#border {
    position: absolute;
    top: 0;
    left: 0;
    stroke: none;
    stroke-dasharray: 144;
    stroke-dashoffset: 144;
    transition: all .9s linear;
  }

  .btn-circle-download svg#arrow {
    position: absolute;
    top: 14px;
    left: 17px;
    stroke: #9098A9;
    transition: all .2s ease;
  }

  .btn-circle-download svg#check {
    position: absolute;
    top: 17px;
    left: 13px;
    stroke: white;
    transform: scale(0);
  }

  .btn-circle-download:hover {
    background: rgba(0, 119, 255, 0.2);
  }

  .btn-circle-download:hover #arrow path,
  .btn-circle-download:hover #arrow polyline {
    stroke: #0077FF;
  }

  .btn-circle-download.load {
    background: rgba(0, 119, 255, 0.2);
  }

  .btn-circle-download.load #arrow path,
  .btn-circle-download.load #arrow polyline {
    stroke: #0077FF;
  }

  .btn-circle-download.load #border {
    stroke: #0077FF;
    stroke-dasharray: 144;
    stroke-dashoffset: 0;
  }

  .btn-circle-download.done {
    background: #0077FF;
    animation: rubberBand .8s;
  }

  .btn-circle-download.done #border,
  .btn-circle-download.done #arrow {
    display: none;
  }

  .btn-circle-download.done #check {
    transform: scale(1);
    transition: all .2s ease;
    transition-delay: .2s;
  }

  .download-text {
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    font-size: 14px;
    color: #0077FF;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: "Poppins", sans-serif;
  }

  @keyframes rubberBand {
    from { transform: scale(1, 1, 1); }
    30% { transform: scale3d(1.15, 0.75, 1); }
    40% { transform: scale3d(0.75, 1.15, 1); }
    50% { transform: scale3d(1.10, 0.85, 1); }
    65% { transform: scale3d(.95, 1.05, 1); }
    75% { transform: scale3d(1.05, .95, 1); }
    to { transform: scale3d(1, 1, 1); }
  }
`;

// Componente para la imagen del hotel
const HotelImage = ({ delay = 0.2, imageSrc }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    style={{ transformOrigin: "center center" }}
    className="w-full h-52 mb-6 rounded-lg relative z-0"
  >
    <img 
      src={imageSrc} 
      alt="Hotel Manantial Valencia" 
      className="w-full h-full object-cover rounded-lg"
    />
  </motion.div>
);

// Componente para la barra de progreso
const ProgressBar = ({ sectionIndex, totalSections }) => {
  // Solo mostrar la barra de progreso en las pantallas de preguntas (2-11)
  if (sectionIndex < 1 || sectionIndex > 11) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="flex-none"
    >
      <div className="flex w-full mb-2 gap-1">
        {[...Array(11)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ 
              opacity: 1, 
              scaleX: 1,
              backgroundColor: index < sectionIndex ? '#48CAE8' : '#d1d5db'
            }}
            transition={{ 
              delay: 0.2 + index * 0.08, 
              duration: 0.5, 
              ease: [0.4, 0, 0.2, 1],
              opacity: { duration: 0.3 },
              backgroundColor: { duration: 0.3 }
            }}
            style={{ transformOrigin: "left center" }}
            className="flex-grow h-2 rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
};

// Componente para el fondo decorativo
const DecorativeBackground = ({ imageSrc }) => (
  <div className="absolute inset-0 z-0">
    <img 
      src={imageSrc} 
      alt="Background" 
      className="w-full h-full object-cover opacity-[0.09] scale-x-[-1] pointer-events-none"
    />
  </div>
);

export const AnimatedContainer = ({ children, className = '', direction }) => (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className={`container mx-auto px-4 max-w-md h-full flex flex-col p-4 relative ${className}`}
    >
      {children}
    </motion.div>
  );

// Componente para el contenido principal con animaciones
const AnimatedContent = ({ children, delay = 0.1 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    className="flex-1 flex flex-col items-center justify-center relative z-10"
  >
    {children}
  </motion.div>
);

// Componente para los botones de navegación
const NavigationButtons = ({ onNext, onPrevious, isFirstPage, isLastPage, buttonText, disabled = false }) => (
  <motion.div 
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    className="flex-none flex justify-between items-center w-full mt-4 relative z-20"
  >
    <div className="flex items-center">
      <img 
        src="/logo.png" 
        alt="Hotel Manantial Logo" 
        className="h-12 w-auto object-contain"
      />
    </div>
    <div className="flex items-center gap-4">
      {!isFirstPage && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          onClick={onPrevious}
          className="bg-gray-200 text-gray-700 py-3 px-5 rounded-full text-base font-medium hover:bg-gray-300 transition-colors"
        >
          Anterior
        </motion.button>
      )}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        onClick={onNext}
        disabled={disabled}
        className={`${
          isLastPage ? 'bg-green-500 hover:bg-green-600' : 'bg-gradient-to-r from-[#48CAE8] to-[#00B4D8] hover:from-[#00B4D8] hover:to-[#0096C7]'
        } text-white py-3 px-5 rounded-full text-base font-medium tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2`}
      >
        {buttonText || (isLastPage ? 'Finalizar' : 'Siguiente')}
        {!isLastPage && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )}
      </motion.button>
    </div>
  </motion.div>
);

// Componente para las pantallas de preguntas (3-11)
const QuestionScreen = ({ sectionIndex, totalSections, question, onNext, onPrevious, ratingOptions, images, direction, selectedAnswer, onAnswerChange }) => {
  const [selectedOption, setSelectedOption] = useState(selectedAnswer || null);
  const [showConditionalScreen, setShowConditionalScreen] = useState(false);
  
  useEffect(() => {
    setSelectedOption(selectedAnswer || null);
  }, [selectedAnswer]);

  const handleOptionClick = (option) => {
    const newSelection = selectedOption === option ? null : option;
    setSelectedOption(newSelection);
    onAnswerChange(sectionIndex - 2, newSelection);
  };

  const handleNext = () => {
    if (selectedOption === 'Regular' || selectedOption === 'Insuficiente') {
      setShowConditionalScreen(true);
    } else {
      onNext();
    }
  };

  if (showConditionalScreen) {
    return (
      <AnimatedContainer key="conditional-comment" direction="forward">
        <DecorativeBackground imageSrc={images.hotel} />
        <AnimatedContent>
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.4, 0, 0.2, 1],
              willChange: "transform, opacity"
            }}
            style={{ 
              transformOrigin: "center center",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "translateZ(0)"
            }}
            className="w-full h-52 mb-6 rounded-lg relative z-0 flex items-center justify-center"
          >
            <span className="text-8xl">
              {selectedOption === 'Regular' ? '😐' : '😠'}
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.3, 
              duration: 0.5, 
              ease: [0.4, 0, 0.2, 1],
              willChange: "transform, opacity"
            }}
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "translateZ(0)"
            }}
            className="text-xl font-semibold mb-4 text-center px-2"
          >
            ¡Ayúdenos a mejorar! Por favor complemente su respuesta.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.4, 
              duration: 0.5, 
              ease: [0.4, 0, 0.2, 1],
              willChange: "transform, opacity"
            }}
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "translateZ(0)"
            }}
            className="w-full"
          >
            <textarea
              className="w-full h-48 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#48CAE8] focus:border-transparent outline-none transition-all resize-none"
              placeholder="Escriba su comentario aquí..."
            />
          </motion.div>
        </AnimatedContent>
        <NavigationButtons 
          onNext={() => {
            setShowConditionalScreen(false);
            onNext();
          }} 
          onPrevious={() => setShowConditionalScreen(false)} 
          isFirstPage={false} 
          isLastPage={false}
          buttonText="Continuar"
        />
      </AnimatedContainer>
    );
  }
  
  return (
    <AnimatedContainer key={`screen-${sectionIndex}`} direction={direction}>
      <ProgressBar sectionIndex={sectionIndex} totalSections={totalSections} />
      <DecorativeBackground imageSrc={images.hotel} />
      <AnimatedContent>
        <HotelImage imageSrc={images.hotel} />
        <motion.h2 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-xl font-semibold mb-4 text-center px-2"
        >
          {question || 'Pregunta no disponible'}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="w-full space-y-2"
        >
          {ratingOptions.map((option) => (
            <div
              key={option}
              role="button"
              tabIndex={0}
              onClick={() => handleOptionClick(option)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleOptionClick(option);
                }
              }}
              className={`flex items-center p-2 border rounded-lg cursor-pointer bg-white shadow-sm transition-all duration-200 relative overflow-hidden ${
                selectedOption === option 
                  ? 'border-[#48CAE8] bg-blue-50' 
                  : 'border-gray-300'
              }`}
              style={{
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation'
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-[#48CAE8]/0 via-[#48CAE8]/0 to-[#48CAE8]/0 transition-all duration-300 ${
                selectedOption === option 
                  ? 'from-[#48CAE8]/5 via-[#48CAE8]/10 to-[#48CAE8]/5' 
                  : ''
              }`}></div>
              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-[#48CAE8] transition-all duration-300 ${
                selectedOption === option ? 'opacity-100' : 'opacity-0'
              }`}></div>
              <input
                type="checkbox"
                name={`rating-${sectionIndex}`}
                className="w-4 h-4 mr-3 accent-[#48CAE8] relative z-10"
                checked={selectedOption === option}
                onChange={() => {}}
                onClick={(e) => e.stopPropagation()}
              />
              <span className={`text-base relative z-10 transition-colors duration-300 flex-1 ${
                selectedOption === option ? 'text-[#48CAE8]' : 'text-gray-700'
              }`}>{option}</span>
              <span className="text-xl relative z-10">
                {option === 'Excelente' && '😊'}
                {option === 'Bueno' && '🙂'}
                {option === 'Regular' && '😐'}
                {option === 'Insuficiente' && '😠'}
              </span>
            </div>
          ))}
        </motion.div>
      </AnimatedContent>
      <NavigationButtons 
        onNext={handleNext} 
        onPrevious={onPrevious} 
        isFirstPage={false} 
        isLastPage={false}
        buttonText={selectedOption ? 'Siguiente' : 'Saltar'}
      />
    </AnimatedContainer>
  );
};

// Componente para la pantalla de sorteo
const RaffleScreen = ({ onNext, formData, images }) => {
  const [email, setEmail] = useState('');
  const [showTicket, setShowTicket] = useState(false);
  const [ticketCode, setTicketCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const date = new Date();
      const formattedDate = date.toLocaleDateString('es-ES', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).toUpperCase();
      setCurrentDate(formattedDate);
    };

    updateDate();
    const interval = setInterval(updateDate, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowThankYou(true);

    setTimeout(() => {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      setTicketCode(code);
      setShowTicket(true);
      setIsSubmitting(false);
    }, 3000);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      // Aquí iría la lógica de descarga real (usando html2canvas o similar)
      // Por ahora, solo simula la descarga.
    }, 1500);
  };

  return (
    <AnimatedContainer key="raffle" direction="forward">
      <DecorativeBackground imageSrc="/img/ticket.webp" />
      <AnimatedContent>
        {!showThankYou ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="w-full max-w-md mx-auto flex flex-col items-center justify-center py-12"
          >
            <h2 className="text-2xl font-semibold mb-4 text-center">
              ¡Participa en nuestro sorteo mensual y gana increíbles premios!
            </h2>
            <p className="text-gray-600 mb-8 text-center text-lg">
              Ingresa tu correo y participa para ganar 2 días de Pool y una estadía mensual.
            </p>
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo Electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="ejemplo@correo.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#48CAE8] focus:border-transparent outline-none transition-all"
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#48CAE8] to-[#00B4D8] hover:from-[#00B4D8] hover:to-[#0096C7] text-white py-3 px-5 rounded-full text-base font-medium tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Participar ahora'}
              </button>
            </form>
          </motion.div>
        ) : !showTicket ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md mx-auto flex flex-col items-center justify-center py-12"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="w-full h-52 mb-6 rounded-lg relative z-0 flex items-center justify-center"
            >
              <span className="text-8xl">🎉</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="text-2xl font-semibold mb-8 text-center"
            >
              ¡Gracias por sus comentarios!
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="w-full"
            >
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "linear" }}
                  className="h-full bg-[#48CAE8]"
                />
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.4, 0, 0.2, 1],
              willChange: "transform, opacity"
            }}
            style={{ 
              transformOrigin: "center center",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "translateZ(0)"
            }}
            className="w-full max-w-md mx-auto flex flex-col items-center justify-center py-12"
          >
            {/* Ticket basado en la imagen proporcionada */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.2,
                duration: 0.6, 
                ease: [0.4, 0, 0.2, 1],
                willChange: "transform, opacity"
              }}
              style={{ 
                transformOrigin: "center center",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "translateZ(0)"
              }}
              className="w-[320px] bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Header con imagen de fondo */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative h-32 bg-cover bg-center" 
                style={{ backgroundImage: "url('/img/ticket.webp')" }}
              >
                <div className="absolute inset-0 bg-black/30"></div> {/* Capa oscura */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.h3 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-lg font-semibold text-white text-center"
                  >
                    ¡YA ESTÁS PARTICIPANDO!
                  </motion.h3>
                </div>
              </motion.div>

              {/* Cuerpo del ticket */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  {/* Info Izquierda (Participante, Código) */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="flex flex-col gap-2"
                  >
                    {/* Participante */}
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">participante</p>
                      <h4 className="text-sm font-medium text-gray-800">{formData.nombre.toUpperCase()}</h4>
                    </div>
                    {/* Código */}
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">codigo</p>
                      <h4 className="text-sm font-medium text-gray-800">{ticketCode}</h4>
                    </div>
                    {/* Email */}
                     <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">email</p>
                      <h4 className="text-sm font-medium text-gray-800 break-all">{email}</h4>
                    </div>
                  </motion.div>

                  {/* Logo Derecha */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="flex-shrink-0"
                  >
                     <img src="/logo-ticket.png" alt="Logo Hotel Manantial" className="w-20 h-auto" />
                  </motion.div>
                </div>

                {/* Fecha */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="pt-2 mt-2 border-t border-gray-100 text-xs text-gray-500"
                >
                   {currentDate}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Botón de descarga */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              onClick={handleDownload}
              className={`relative mt-8 w-12 h-12 rounded-full bg-gray-100 hover:bg-blue-50 transition-all duration-300 ${
                isDownloading ? 'bg-blue-100' : ''
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {!isDownloading ? (
                  <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm font-medium text-blue-500 uppercase tracking-wider">
                Descargar
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatedContent>
    </AnimatedContainer>
  );
};

export default function SurveySection(props) {
    const {
      sectionIndex,
      totalSections,
      onNext,
      onPrevious,
      direction,
      questions = [],
      ratingOptions = ['Excelente', 'Bueno', 'Regular', 'Insuficiente'],
      images = {
        background: "/comment.jpg",
        hotel: "/comment.jpg"
      }
    } = props;

    // Añadir estilos al documento
    useEffect(() => {
      const styleElement = document.createElement('style');
      styleElement.textContent = ticketStyles;
      document.head.appendChild(styleElement);

      return () => {
        document.head.removeChild(styleElement);
      };
    }, []);

    // Limpiar localStorage cuando se inicia la encuesta (pantalla 0)
    useEffect(() => {
      if (sectionIndex === 0) {
        localStorage.removeItem('surveyFormData');
        localStorage.removeItem('surveyAnswers');
      }
    }, [sectionIndex]);

    const [formData, setFormData] = useState(() => {
      try {
        const savedFormData = localStorage.getItem('surveyFormData');
        return savedFormData ? JSON.parse(savedFormData) : {
          nombre: '',
          habitacion: '',
          fecha: new Date().toLocaleDateString('en-CA')
        };
      } catch (error) {
        console.error('Error loading form data:', error);
        return {
          nombre: '',
          habitacion: '',
          fecha: new Date().toLocaleDateString('en-CA')
        };
      }
    });

    const [answers, setAnswers] = useState(() => {
      try {
        const savedAnswers = localStorage.getItem('surveyAnswers');
        return savedAnswers ? JSON.parse(savedAnswers) : {};
      } catch (error) {
        console.error('Error loading saved answers:', error);
        return {};
      }
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      const newFormData = {
        ...formData,
        [name]: value
      };
      setFormData(newFormData);
      try {
        localStorage.setItem('surveyFormData', JSON.stringify(newFormData));
      } catch (error) {
        console.error('Error saving form data:', error);
      }
    };

    const handleAnswerChange = (questionIndex, answer) => {
      setAnswers(prev => {
        const newAnswers = {
          ...prev,
          [questionIndex]: answer
        };
        try {
          localStorage.setItem('surveyAnswers', JSON.stringify(newAnswers));
        } catch (error) {
          console.error('Error saving answers:', error);
        }
        return newAnswers;
      });
    };

    const handleNext = () => {
      if (sectionIndex === 1 && !isFormValid) {
        window.alert('Por favor llene todos los campos obligatorios');
        return;
      }
      onNext();
    };
  
    const handlePrevious = () => {
      onPrevious();
    };

    const isFormValid = formData.nombre.trim() !== '' && formData.habitacion.trim() !== '';

  // Contenido de la primera pantalla
  if (sectionIndex === 0) {
    return (
      <AnimatedContainer key="welcome-screen" direction={direction}>
        <DecorativeBackground imageSrc={images.hotel} />
        <AnimatedContent>
          <HotelImage imageSrc={images.hotel} />
          <motion.h1 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="text-3xl font-bold mb-8 text-center tracking-tight"
          >
            ¡Gracias por elegir al Hotel Manantial Valencia!
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="text-lg text-gray-700 mb-12 px-4 text-left leading-relaxed"
          >
            Tu opinión es muy importante para nosotros. Completa esta breve encuesta y participa en el sorteo mensual de 2 Pool Day para dos personas y una noche de estadía completamente gratis.
          </motion.p>
        </AnimatedContent>
        <NavigationButtons 
          onNext={handleNext} 
          onPrevious={handlePrevious} 
          isFirstPage={true} 
          isLastPage={false}
          buttonText="Aceptar"
        />
      </AnimatedContainer>
    );
  }

  // Contenido de la segunda pantalla
  if (sectionIndex === 1) {
    return (
      <AnimatedContainer key="info-screen" direction={direction}>
        <ProgressBar sectionIndex={sectionIndex} totalSections={totalSections} />
        <DecorativeBackground imageSrc={images.hotel} />
        <AnimatedContent>
          <HotelImage imageSrc={images.hotel} />
          <div className="w-full space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-2"
            >
              <label className="block text-base font-medium text-gray-700">
                ¿Nos indica su nombre completo? <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#48CAE8] focus:border-transparent outline-none transition-all"
                placeholder="Ingrese su nombre completo"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-2"
            >
              <label className="block text-base font-medium text-gray-700">
                ¿Nos facilita su número de habitación? <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="habitacion"
                value={formData.habitacion}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#48CAE8] focus:border-transparent outline-none transition-all"
                placeholder="Ingrese su número de habitación"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-2"
            >
              <label className="block text-base font-medium text-gray-700">
                Por último, ¿cuál fue su fecha de salida?
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#48CAE8] focus:border-transparent outline-none transition-all appearance-none bg-white min-h-[48px]"
                  style={{
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    appearance: 'none'
                  }}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatedContent>
        <NavigationButtons 
          onNext={handleNext} 
          onPrevious={handlePrevious} 
          isFirstPage={false} 
          isLastPage={false}
          buttonText="Siguiente"
        />
      </AnimatedContainer>
    );
  }

  // Contenido de las pantallas 3 a 11
  if (sectionIndex >= 2 && sectionIndex <= 10) {
    const currentQuestion = questions[sectionIndex - 2];
    
    return (
      <QuestionScreen 
        sectionIndex={sectionIndex}
        totalSections={totalSections}
        question={currentQuestion}
        onNext={handleNext}
        onPrevious={handlePrevious}
        ratingOptions={ratingOptions}
        images={images}
        direction={direction}
        selectedAnswer={answers[sectionIndex - 2]}
        onAnswerChange={handleAnswerChange}
      />
    );
  }

  // Contenido de la última pantalla (11)
  if (sectionIndex === 11) {
    return (
      <AnimatedContainer key="final-screen" direction={direction}>
        <ProgressBar sectionIndex={sectionIndex} totalSections={totalSections} />
        <DecorativeBackground imageSrc={images.hotel} />
        <AnimatedContent>
          <HotelImage imageSrc={images.hotel} />
          <motion.h2 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="text-xl font-semibold mb-4 text-center px-2"
          >
            ¿Podría calificar al Hotel dejando un comentario sobre su estadía?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="w-full"
          >
            <textarea
              className="w-full h-48 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#48CAE8] focus:border-transparent outline-none transition-all resize-none"
              placeholder="Escriba su comentario aquí..."
            />
          </motion.div>
        </AnimatedContent>
        <NavigationButtons 
          onNext={handleNext} 
          onPrevious={handlePrevious} 
          isFirstPage={false} 
          isLastPage={true}
          buttonText="Finalizar"
        />
      </AnimatedContainer>
    );
  }

  // Pantalla de correo (12)
  if (sectionIndex === 12) {
    return <RaffleScreen onNext={handleNext} formData={formData} images={images} />;
  }

  // Pantalla de agradecimiento (13)
  if (sectionIndex === 13) {
    return (
      <AnimatedContainer key="thank-you" direction="forward">
        <DecorativeBackground imageSrc={images.hotel} />
        <AnimatedContent>
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="w-full h-52 mb-6 rounded-lg relative z-0 flex items-center justify-center"
          >
            <span className="text-8xl">🎉</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="text-xl font-semibold mb-4 text-center px-2"
          >
            ¡Gracias por sus comentarios!
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="w-full"
          >
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 3, ease: "linear" }}
                className="h-full bg-[#48CAE8]"
              />
            </div>
          </motion.div>
        </AnimatedContent>
      </AnimatedContainer>
    );
  }

  // Si llegamos aquí, algo salió mal
  return null;
}