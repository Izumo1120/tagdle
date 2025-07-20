import React, { useEffect, useState } from "react";
import './Home.css';
import Header from '../../components/Header/Header';
import { Link } from "react-router-dom";

type ApiItem = {
  id: number;
  name: string;
  identifier: string;
  status: number;
};

type UiItem = {
  id: number;
  name: string;
  identifier: string;
  image: string;
  status: "使用中" | "空き" | "故障中";
};

const statusMap: Record<number, UiItem["status"]> = {
  0: "空き",
  1: "使用中",
  2: "故障中",
};

const Home: React.FC = () => {
  const [items, setItems] = useState<UiItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/items")
      .then((res) => res.json())
      .then((data: ApiItem[]) => {
        const mappedItems = data.map((item) => ({
          id: item.id,
          name: item.name,
          identifier: item.identifier,
          image: "/camera.jpg", // 仮の画像
          status: statusMap[item.status] ?? "空き",
        }));
        setItems(mappedItems);
      })
      .catch((err) => {
        console.error("データ取得エラー:", err);
      });
  }, []);

  const getStatusStyle = (status: UiItem["status"]) => {
    switch (status) {
      case "使用中":
        return "status status-yellow";
      case "空き":
        return "status status-blue";
      case "故障中":
        return "status status-red";
      default:
        return "status";
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="title">物品管理一覧</h1>
        <div className="grid">
          {items.map((item) => (
            <Link
              to={`/item/${item.id}`}
              state={{ item }}
              key={item.id}
              className="card"
            >
              <img src={item.image} alt={item.name} />
              <h2 className="card-title">{item.name}</h2>
              <p className="card-id">ID: {item.id}</p>
              <span className={getStatusStyle(item.status)}>{item.status}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
