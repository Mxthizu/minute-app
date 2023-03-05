import React from 'react';
import { Routes, Route} from "react-router-dom";
import Compteur from './pages/Compteur';
import Chronometre from './pages/Chronometre';
import Minuteur from './pages/Minuteur';
import HomePage from './pages/HomePage';
import Layout from './components/Layout';
import './styles/App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/compteur" element={<Layout><Compteur /></Layout>} />
        <Route path="/chronometre" element={<Layout><Chronometre /></Layout>} />
        <Route path="/minuteur" element={<Layout><Minuteur /></Layout>} />
      </Routes>
    </>
  );
}

export default App;
