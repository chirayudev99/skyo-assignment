import React from "react";
import styles from './modal.module.css';

function Modal({ card, onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <img src={card.url} alt={card.title} className={styles.modalImage} />
        <h2>{card.title}</h2>
        <p>Album ID: {card.albumId}</p>
      </div>
    </div>
  );
}

export default Modal;
