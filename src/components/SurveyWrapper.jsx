import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SurveySection from './SurveySection';

export default function SurveyWrapper() {
  const [currentSection, setCurrentSection] = useState(0);
  const [navDirection, setNavDirection] = useState('forward');

  const handleNext = () => {
    setNavDirection('forward');
    setCurrentSection(prev => Math.min(prev + 1, 13));
  };
  
  const handlePrevious = () => {
    setNavDirection('backward');
    setCurrentSection(prev => Math.max(prev - 1, 0));
  };

  const questions = [
    "¿De qué manera fue atendido durante el proceso del check in?",
    "¿En qué condiciones se encontraba la habitación que le fue asignada?",
    "¿De qué manera calificaría las condiciones del baño?",
    "¿Cómo calificaría al restaurant Red Sport Bar?",
    "¿Cómo calificaría al restaurant Manolo's?",
    "¿Qué tal estuvieron las opciones y la calidad del desayuno?",
    "¿Qué tan satisfecho quedó con el servicio de Room Service cuando lo solicitó?",
    "¿Cómo calificaría la piscina?",
    "¿Cómo fue la atención al momento de realizar el check out?"
  ];

  const ratingOptions = ['Excelente', 'Bueno', 'Regular', 'Insuficiente'];
  
  // Imágenes para cada sección
  const sectionImages = {
    0: { hotel: "/img/comment.webp" }, // Pantalla de bienvenida
    1: { hotel: "/img/nombre.webp" },    // Pantalla de información
    2: { hotel: "/img/checkin.webp" }, // Check in
    3: { hotel: "/img/habitacion.webp" },    // Habitación
    4: { hotel: "/img/bano.webp" }, // Baño
    5: { hotel: "/img/redsportbar.webp" }, // Red Sport Bar
    6: { hotel: "/img/manolo.webp" },  // Manolo's
    7: { hotel: "/img/desayuno.webp" }, // Desayuno
    8: { hotel: "/img/roomserv.webp" }, // Room Service
    9: { hotel: "/img/piscina.webp" },     // Piscina
    10: { hotel: "/img/checkout.webp" }, // Check out
    11: { hotel: "/img/comment.webp" }, // Comentario final
    12: { hotel: "/img/ticket.webp" },  // Correo
    13: { hotel: "/img/comment.webp" }  // Gracias
  };

  return (
    <div className="h-[100dvh] bg-[#f5f5f5]">
      <AnimatePresence mode="wait" custom={navDirection}>
        <SurveySection
          key={`${currentSection}-${navDirection}`}
          sectionIndex={currentSection}
          totalSections={14}
          onNext={handleNext}
          onPrevious={handlePrevious}
          questions={questions}
          ratingOptions={ratingOptions}
          images={sectionImages[currentSection]}
          direction={navDirection}
        />
      </AnimatePresence>
    </div>
  );
}