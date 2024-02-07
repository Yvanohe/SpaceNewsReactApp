import React from 'react';
import ReactDOM from 'react-dom/client';
import Launch from './pages/Launch';
import Favorites from './pages/Favorites';
import Header from './components/Header';
import Error from './components/Error';
import Home from './pages/Home'
import Search from './pages/Search';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/launch" element={<Launch />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
