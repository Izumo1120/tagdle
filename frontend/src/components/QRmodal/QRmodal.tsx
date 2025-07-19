import QrScannerComponent from '../../components/QRscanner';
import './QRModal.css';

type Props = {
  onClose: () => void;
};

const QRModal = ({ onClose }: Props) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>✖</button>
        <h2>📷 QRコード読み取り</h2>
        <QrScannerComponent
          onScan={(text) => {
            alert(`読み取り結果: ${text}`);
            onClose();
          }}
        />
      </div>
    </div>
  );
};

export default QRModal;
