import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ← 追加
import './Manageitems.css';

type Props = {
  onClose: () => void;
};

const ManageItemModal = ({ onClose }: Props) => {
  const navigate = useNavigate(); // ← 追加

  const [formData, setFormData] = useState({
    name: '',
    category_id: 1,
    identifier: '',
    image_id: 1,
    location_id: 1,
    created_at: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('物品が追加されました');
        console.log(data);
        onClose();
        navigate('/'); // ← ホームに遷移
        window.location.reload(); 
      } else {
        alert('追加に失敗しました: ' + data.error);
      }
    } catch (error) {
      console.error('送信エラー:', error);
      alert('送信に失敗しました');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>✖</button>
        <h2>📦 物品を追加</h2>
        <form onSubmit={handleSubmit}>
          <div><label>名前:</label><input name="name" value={formData.name} onChange={handleChange} required /></div>
          <div><label>カテゴリID:</label><input name="category_id" type="number" value={formData.category_id} onChange={handleChange} required /></div>
          <div><label>識別子:</label><input name="identifier" value={formData.identifier} onChange={handleChange} required /></div>
          <div><label>画像ID:</label><input name="image_id" type="number" value={formData.image_id} onChange={handleChange} required /></div>
          <div><label>場所ID:</label><input name="location_id" type="number" value={formData.location_id} onChange={handleChange} required /></div>
          <div><label>登録日:</label><input name="created_at" type="date" value={formData.created_at} onChange={handleChange} required /></div>
          <button type="submit">追加</button>
        </form>
      </div>
    </div>
  );
};

export default ManageItemModal;
