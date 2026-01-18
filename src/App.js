import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import News from './components/News';
import TopLoader from './components/Toploader';

function App() {
  return (
    <Router>
      <TopLoader />
      <Navbar title="NewsNest" />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/:category" element={<News />} />
      </Routes>
    </Router>
  );
}

export default App;
