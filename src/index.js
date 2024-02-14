import React from 'react';
import ReactDOM from 'react-dom/client';
import Launches from './pages/Launches';
import Launch from './pages/Launch';
import Favorites from './pages/Favorites';
import Header from './components/Header';
import Footer from './components/Footer';
import Error from './components/Error';
import Home from './pages/Home'
import Search from './pages/Search';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import GlobalStyle from './utils/style/GlobaleStyle';
import { ThemeProvider } from './utils/context';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/launches" element={<Launches />} />
          <Route path="/launch/:launchId" element={<Launch />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </Router>

  </React.StrictMode>
);
