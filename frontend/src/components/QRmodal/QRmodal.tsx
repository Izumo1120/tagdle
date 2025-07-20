import React from 'react';
import QrScannerComponent from '../../components/QRscanner';
import './QRModal.css';

type Props = {
  onClose: () => void;
};

const QRModal = ({ onClose }: Props) => {
  const handleScan = async (text: string) => {
    try {
      // QRコード読み取り結果を送信
      const response = await fetch('/api/qr-action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qrText: text }),
      });

      const result = await response.json();

      // 結果に応じた処理
      if (result.status === 1) {
        const confirm = window.confirm("この物品を借りますか？");
        if (confirm) {
          alert("借用処理を開始します。");
          // ここに借用APIを呼ぶ処理を追加可能
        }
      } else if (result.status === 2) {
        const confirm = window.confirm("この物品を返却しますか？");
        if (confirm) {
          alert("返却処理を開始します。");
          // ここに返却APIを呼ぶ処理を追加可能
        }
      } else if (result.status === 0) {
        alert("この物品は現在他のユーザーが使用中です。");
      } else {
        alert("不明な応答を受け取りました。");
      }

      onClose();

    } catch (error) {
      console.error("QR送信エラー:", error);
      alert("QRコードの送信に失敗しました。");
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
