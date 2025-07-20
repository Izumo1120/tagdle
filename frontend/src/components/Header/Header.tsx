import './Header.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/signup' || location.pathname === '/signin';
  const isItemDetailsPage = location.pathname.startsWith('/item/');
  const navigate = useNavigate();

  // isAuthPageがtrueなら 'header--static', falseなら 'header--fixed' を追加
  const headerClassName = `header ${isAuthPage ? 'header--static' : 'header--fixed'}`;

  return (
    <header className={headerClassName}>
      <div className="header-title">Tagdle</div>
      {!isAuthPage && <button className="logout-button">ログアウト</button>}
      {isItemDetailsPage && <button className="homeback-button" onClick={() => navigate("/")}>物品管理一覧に戻る</button>}
    </header>
  );
};

export default Header;
