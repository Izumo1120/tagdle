// Footer.tsx
import './Footer.css';

type Props = {
  onOpenQR: () => void;
  onOpenAddItem: () => void; // 追加
};

const Footer = ({ onOpenQR, onOpenAddItem }: Props) => {
  return (
    <footer className="footer">
      <button onClick={onOpenQR} className="footer-button">
        📷 QRコード読取
      </button>
      <button onClick={onOpenAddItem} className="footer-button"> {/* 変更 */}
        ➕ 物品追加
      </button>
    </footer>
  );
};

export default Footer;
