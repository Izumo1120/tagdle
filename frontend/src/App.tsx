import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import QRModal from './components/QRmodal/QRmodal';

import SignUp from './pages/sign_up';
import Home from './pages/Home';

import './App.css';

const Layout = () => {
  const [showQR, setShowQR] = useState(false);
  const location = useLocation();

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </main>

      {/* SignUp 以外で Footer を表示 */}
      {location.pathname !== '/' && (
        <Footer onOpenQR={() => setShowQR(true)} />
      )}

      {/* QRコード読み取りモーダル */}
      {showQR && <QRModal onClose={() => setShowQR(false)} />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
