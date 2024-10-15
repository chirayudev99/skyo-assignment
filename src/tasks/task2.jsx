import React, { useState, useEffect } from "react";
import Modal from './modal';
import styles from './task2.module.css';

function CardGrid() {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/photos?_limit=20"
        );
        const data = await response.json();
        setCards(data);
      } catch (err) {
        setError("Failed to fetch data.");
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
     <h2>Task 2 - CardGrid</h2>

      <div className={styles.cardGrid}>
        {cards.map((card) => (
          <div key={card.id} className={styles.card} onClick={() => handleCardClick(card)}>
            <img src={card.thumbnailUrl} alt={card.title} className={styles.cardImage} />
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <button className={styles.readMoreButton} onClick={() => handleCardClick(card)}>
              Read More
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && selectedCard && (
        <Modal card={selectedCard} onClose={closeModal} />
      )}
    </div>
  );
}

export default CardGrid;
