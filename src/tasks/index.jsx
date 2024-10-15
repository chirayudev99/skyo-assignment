import React from 'react'
import styles from './task2.module.css';
import { useNavigate } from 'react-router-dom';

function Tasks() {

    const navigate = useNavigate()


  return (
    <>
     <h2>Frontend Oppurtunity at SkyoIndia - Technical Assessment</h2>
     <div className={styles.cardGrid}>
      <div className={styles.card} onClick={() => navigate("/task1")} >
        <h3 className={styles.cardTitle}>Task 1</h3> 
      </div>
      <div className={styles.card} onClick={() => navigate("/task2")} >
        <h3 className={styles.cardTitle}>Task 2</h3> 
      </div>
  </div>
    </>
   
  )
}

export default Tasks