import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import styles from './tasks/task2.module.css';
import Autocomplete from './tasks/task1';
import CardGrid from './tasks/task2';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import Tasks from './tasks';

function App() {


  return (
    <>
     <Router>
       
      <Routes>
        <Route path="/task1" element={<Autocomplete />} />
        <Route path="/task2" element={<CardGrid />} />
        <Route path="*" name="Home" element={<Tasks />} />
      </Routes>
    </Router>
  
    </>
  )
}

export default App
