import React, { useEffect, useState } from 'react';
import QrScannerComponent from '../../components/QRscanner';
import './QRModal.css';
import { useNavigate } from 'react-router-dom'; // ← 追加

type Props = {
  onClose: () => void;
};

type Item = {
  id: number;
  name: string;
  identifier: string;
  status: number;
};

const loggedInUserId = 1;

const QRModal = ({ onClose }: Props) => {
  const [items, setItems] = useState<Item[]>([]);
  const navigate = useNavigate(); // ← 追加


  // 起動時に全物品一覧を取得
  useEffect(() => {
    fetch("http://localhost:8000/items")
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => {
        console.error("物品一覧の取得に失敗しました:", err);
        alert("物品一覧の取得に失敗しました。");
      });
  }, []);

  const handleScan = async (text: string) => {
    try {
      const match = text.match(/\/items\/(.+?)\/status/);
      const extracted = match ? match[1] : null;

      if (!extracted) {
        alert("不正なQRコードです。");
        return;
      }

      const matchedItem = items.find(item => item.identifier === extracted);

      if (!matchedItem) {
        alert("QRコードに対応する物品が見つかりません。");
        return;
      }

      const response = await fetch(
        `http://localhost:8000/items/${matchedItem.identifier}/status?user_id=${loggedInUserId}`
      );

      const result = await response.json();

      if (result.status === 1) {
        const confirm = window.confirm(`${result.name} を借りますか？`);
        if (confirm) {
          const res = await fetch("http://localhost:8000/items/borrow", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              item_id: result.item_id,
              user_id: loggedInUserId
            })
          });

          const borrowResult = await res.json();
          alert(borrowResult.message || "貸出完了");
          onClose();
          navigate("/");
          window.location.reload();

        }
      } else if (result.status === 2) {
        const confirm = window.confirm(`${result.name} を返却しますか？`);
        if (confirm) {
          const res = await fetch(`http://localhost:8000/items/${result.item_id}/return`, {
            method: "POST"
          });

          const returnResult = await res.json();
          alert(returnResult.message || "返却完了");
          onClose();
          navigate("/");
          window.location.reload();
        }
      } else if (result.status === 0) {
        alert(`${result.name} は現在他のユーザーが使用中です。`);
        onClose();
        navigate("/");
        window.location.reload();
      } else {
        alert("不明な応答を受け取りました。");
        onClose();
        navigate("/");
        window.location.reload();
      }

      onClose();
    } catch (error) {
      console.error("QR送信エラー:", error);
      alert("QRコードの送信に失敗しました。");
      onClose();
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>✖</button>
        <h2>📷 QRコード読み取り</h2>
        <QrScannerComponent onScan={handleScan} />
      </div>
    </div>
  );
};

export default QRModal;
