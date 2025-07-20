// src/App.tsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import QRModal from './components/QRmodal/QRmodal';
import Managementmodal from './components/ManageItems/Manageitems'; // 物品追加モーダル
import Signin from './pages/Signin/sign_in';
import Generate from './pages/Generate/generate';
import SignUp from './pages/Signup/sign_up';
import ItemDetails from './pages/ItemDetails/Itemdetails';
import Home from './pages/Home/Home';

import './App.css';

const Layout = () => {
  const [showQR, setShowQR] = useState(false);
  const [showManageItem, setShowManageItem] = useState(false);
  const location = useLocation();

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/item/:id" element={<ItemDetails />} />
        </Routes>
      </main>

      {/* SignUp / SignIn ページ以外でFooterを表示 */}
      {!['/signup', '/signin'].includes(location.pathname) && (
        <Footer
          onOpenQR={() => setShowQR(true)}
          onOpenAddItem={() => setShowManageItem(true)}
        />
      )}

      {/* モーダル表示 */}
      {showQR && <QRModal onClose={() => setShowQR(false)} />}
      {showManageItem && <Managementmodal onClose={() => setShowManageItem(false)} />}
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
