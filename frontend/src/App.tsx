import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import QRModal from './components/QRmodal/QRmodal';

import Signin from './pages/Signin/sign_in';
import Generate from './pages/Generate/generate';
import SignUp from './pages/Signup/sign_up';


import Home from './pages/Home/Home';

import './App.css';

const Layout = () => {
  const [showQR, setShowQR] = useState(false);
  const location = useLocation();

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/generate" element={<Generate />} />
        </Routes>
      </main>

      {/* SignUpもしくはSignin以外で Footer を表示 */}
      {!['/signup', '/signin'].includes(location.pathname) && (
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
