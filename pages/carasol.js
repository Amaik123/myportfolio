// src/components/CardCarousel.jsx
import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/ThreeDCard.module.css"; // Ensure correct path

const cardsData = [
  {
    id: 1,
    title: "Dedica moltes hores",
    description:
      "Un mínim de 30 hores a la setmana. Si no en tens prou, hauràs de dedicar-li més hores. Al principi sembla impossible, però notaràs una millora ràpidament.",
    image:
      "https://s5-onboarding-digital-angular.vercel.app/assets/time_managment.svg",
    bgColor: "rgb(71, 166, 185)",
  },
  {
    id: 2,
    title: "Programa projectes propis",
    description: "", // No description for this card
    image:
      "https://s5-onboarding-digital-angular.vercel.app/assets/programming.svg",
    bgColor: "rgb(211, 212, 217)",
  },
  {
    id: 3,
    title: "Procura descansar",
    description:
      "Descansar bé i desconnectar són vitals. D'aquesta manera reduiràs l'estrès i l'ansietat. Milloraràs la teva concentració i consolidaràs el teu aprenentatge.",
    image:
      "https://s5-onboarding-digital-angular.vercel.app/assets/meditation.svg",
    bgColor: "rgb(255, 209, 103)",
  },
];

const CardCarousel = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalCards = cardsData.length;
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);

  const nextCard = () => {
    if (currentStep < totalCards) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousCard = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX;

    if (deltaX > 50) {
      // Swiped left
      nextCard();
    } else if (deltaX < -50) {
      // Swiped right
      previousCard();
    }
  };

  useEffect(() => {
    // Update dots animation
    const dots = carouselRef.current.querySelectorAll(`.${styles.dot}`);
    dots.forEach((dot, index) => {
      if (index === currentStep - 1) {
        dot.classList.add(styles.activeDot);
      } else {
        dot.classList.remove(styles.activeDot);
      }
    });

    // Update card classes
    cardsData.forEach((card) => {
      const cardElement = document.getElementById(`card-${card.id}`);
      if (card.id === currentStep) {
        cardElement.classList.add(styles.principal);
        cardElement.classList.remove(
          styles.siguiente,
          styles.siguiente2,
          styles.anterior,
          styles.anterior2
        );
      } else if (card.id === currentStep + 1) {
        cardElement.classList.add(styles.siguiente);
        cardElement.classList.remove(
          styles.principal,
          styles.siguiente2,
          styles.anterior,
          styles.anterior2
        );
      } else if (card.id === currentStep + 2) {
        cardElement.classList.add(styles.siguiente2);
        cardElement.classList.remove(
          styles.principal,
          styles.siguiente,
          styles.anterior,
          styles.anterior2
        );
      } else if (card.id === currentStep - 1) {
        cardElement.classList.add(styles.anterior);
        cardElement.classList.remove(
          styles.principal,
          styles.siguiente,
          styles.siguiente2,
          styles.anterior2
        );
      } else if (card.id === currentStep - 2) {
        cardElement.classList.add(styles.anterior2);
        cardElement.classList.remove(
          styles.principal,
          styles.siguiente,
          styles.siguiente2,
          styles.anterior
        );
      } else {
        // Reset classes for non-adjacent cards
        cardElement.classList.remove(
          styles.principal,
          styles.siguiente,
          styles.siguiente2,
          styles.anterior,
          styles.anterior2
        );
      }
    });
  }, [currentStep]);

  return (
    <div className={styles.contenedor} ref={carouselRef}>
      {cardsData.map((card) => (
        <div
          key={card.id}
          className={`${styles.card} ${
            card.id === currentStep
              ? styles.principal
              : card.id === currentStep + 1
              ? styles.siguiente
              : card.id === currentStep + 2
              ? styles.siguiente2
              : card.id === currentStep - 1
              ? styles.anterior
              : card.id === currentStep - 2
              ? styles.anterior2
              : ""
          }`}
          id={`card-${card.id}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={styles.cardImage}
            style={{ backgroundColor: card.bgColor }}
          >
            <img src={card.image} alt={`Imagen de la escena ${card.id}`} />
          </div>
          <div className={styles.cardContent}>
            <h3>{card.title}</h3>
            {card.description && <p>{card.description}</p>}
            <div className={styles.cardNavigation}>
              <div className={styles.dots}>
                {cardsData.map((_, index) => (
                  <span
                    key={index}
                    className={`${styles.dot} ${
                      index === currentStep - 1 ? styles.activeDot : ""
                    }`}
                  ></span>
                ))}
              </div>
              <div className={styles.buttons}>
                {currentStep > 1 && (
                  <button
                    onClick={previousCard}
                    className={styles.previousButton}
                  >
                    &#8592;
                  </button>
                )}
                {currentStep < totalCards && (
                  <button onClick={nextCard} className={styles.nextButton}>
                    &#8594;
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Transparent Divs for Click Navigation */}
      <div
        id="div-transparent-previous"
        className={currentStep > 1 ? "" : styles.ocultar}
        onClick={previousCard}
      ></div>
      <div
        id="div-transparent-next"
        className={currentStep < totalCards ? "" : styles.ocultar}
        onClick={nextCard}
      ></div>
    </div>
  );
};

export default CardCarousel;
