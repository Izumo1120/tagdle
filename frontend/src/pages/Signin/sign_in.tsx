// src/pages/sign_in.tsx
import React, { useState } from 'react';
import './sign_in.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email.includes('@')) {
      alert('メールアドレスには「@」を含めてください。');
      return;
    }

    if (form.password.length < 4) {
      alert('パスワードは4文字以上で入力してください。');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const result = await response.json();
        // Note: localStorage is not available in Claude artifacts
        // localStorage.setItem('token', result.access_token);
        alert('ログイン成功！');
        navigate('/home');
      } else {
        const errorData = await response.json();
        alert('ログイン失敗: ' + (errorData.detail || '認証エラー'));
      }
    } catch (error) {
      console.error('通信エラー:', error);
      alert('通信エラーが発生しました');
    }
  };

  return (
    <div className="signin-page">
      {/* ヘッダーを固定位置で画面幅いっぱいに表示 */}
      <div className="header-container">
        <Header />
      </div>
      
      <div className="signin-container">
        <form className="signin-form" onSubmit={handleSubmit}>
          <h2>ログイン</h2>
          <label>
            メールアドレス：
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="example@example.com"
            />
          </label>
          <label>
            パスワード（4文字以上）：
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="パスワード"
            />
          </label>
          <button type="submit">ログイン</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;



// import './App.css'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SignUp from './pages/sign_up';
// import SignIn from './pages/sign_in';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<SignIn />} />
//         <Route path="/signup" element={<SignUp />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App