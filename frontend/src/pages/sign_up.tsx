// src/pages/Register.tsx
import React, { useState } from 'react';

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    studentId: '',
    email: '',
    password: ''
  });

  //入力欄のイベント（例：文字入力）を受け取る関数
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //<input> 要素の name 属性と value を取得
    const { name, value } = e.target;
    
    // name = "email"
    // value = "abc@example.com"

    // setForm(prev => ({
    // ...prev,
    // email: "abc@example.com"  // ← ここだけ更新
    // }));
    // 結果的に：
    // form = {
    // name: "",
    // studentId: "",
    // email: "abc@example.com",
    // password: ""
    // }
    //のように、他の値はそのままで email だけ更新
    //↓

    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // バリデーション：パスワード4文字以上
    if (form.password.length < 4) {
      alert('パスワードは4文字以上で入力してください。');
      return;
    }

    // 「@」が含まれていなければ追加
    let email = form.email;
    if (!email.includes('@')) {
      email += '@example.com'; // ← 適宜補完形式を調整
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
    <form onSubmit={handleSubmit}>
      <h2>新規登録</h2>
      <label>
        名前：
        <input type="text" name="name" value={form.name} onChange={handleChange} required />
      </label>
      <br />
      <label>
        学籍番号（8桁）：
        <input type="text" name="studentId" value={form.studentId} onChange={handleChange} pattern="\d{8}" required />
      </label>
      <br />
      <label>
        メールアドレス：
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
      </label>
      <br />
      <label>
        パスワード（4文字以上）：
        <input type="password" name="password" value={form.password} onChange={handleChange} required />
      </label>
      <br />
      <button type="submit">登録</button>
    </form>
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