import { useState } from 'react';
import QrScannerComponent from '../components/QRscanner';

type Props = {
  onDetected: (result: string) => void;
  onClose: () => void;
};

function QRcode({ onDetected, onClose }: Props) {
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>📷 QRコードスキャナ</h1>
        {!result && (
          <QrScannerComponent
            onScan={(text) => {
              setResult(text);
              onDetected(text);
              onClose();
            }}
          />
        )}
        {result && (
          <div>
            <p>✅ 読み取り結果:</p>
            <strong>{result}</strong>
          </div>
        )}
        <button onClick={onClose}>キャンセル</button>
      </div>
    </div>
  );
}

export default QRcode;
