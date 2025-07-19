import './Footer.css';

type Props = {
  onOpenQR: () => void;
};

const Footer = ({ onOpenQR }: Props) => {
  return (
    <footer className="footer">
      <button onClick={onOpenQR} className="footer-button">
        📷 QRコード読み取り
      </button>
      <button className="footer-button">
        ➕ 物品追加・削除
      </button>
    </footer>
  );
};

export default Footer;
