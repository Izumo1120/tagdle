// src/pages/Register.tsx
import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import './sign_up.css';

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    studentId: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password.length < 4) {
      alert('パスワードは4文字以上で入力してください。');
      return;
    }

    let email = form.email;
    if (!email.includes('@')) {
      email += '@example.com';
    }

    const dataToSend = {
      ...form,
      email,
    };

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        alert('登録成功！');
      } else {
        const errorData = await response.json();
        alert('登録失敗: ' + (errorData.detail || 'サーバーエラー'));
      }
    } catch (error) {
      console.error('エラー:', error);
      alert('通信エラーが発生しました');
    }
  };

  return (
    <>
      <Header />
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>新規登録</h2>

          <label>
            名前：
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            学籍番号（8桁）：
            <input
              type="text"
              name="studentId"
              value={form.studentId}
              onChange={handleChange}
              pattern="\d{8}"
              required
            />
          </label>

          <label>
            メールアドレス：
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
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
            />
          </label>

          <button type="submit" className="signup-button">登録</button>
        </form>
      </div>
    </>
  );
};

export default SignUp;



// import './App.css'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SignUp from './pages/sign_up';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/signup" element={<SignUp />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App