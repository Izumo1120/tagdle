import React from "react";
import './Home.css';
import Header from '../../components/Header/Header';

type Item = {
  id: number;
  name: string;
  image: string;
  status: "使用中" | "空き" | "故障中";
};

const items: Item[] = [
  {
    id: 1,
    name: "ノートパソコン",
    image: "/images/laptop.jpg",
    status: "使用中",
  },
  {
    id: 2,
    name: "デジタルカメラ",
    image: "/images/camera.jpg",
    status: "空き",
  },
  {
    id: 3,
    name: "プロジェクター",
    image: "/images/projector.jpg",
    status: "故障中",
  },
  {
    id: 4,
    name: "プロジェクター",
    image: "/images/projector.jpg",
    status: "故障中",
  },
  {
    id: 5,
    name: "プロジェクター",
    image: "/images/projector.jpg",
    status: "空き",
  },
];

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div className="home-container">
        <h1 className="dashboard-title">物品ダッシュボード</h1>
        <div className="card-grid">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              <img src={item.image} alt={item.name} className="item-image" />
              <h2 className="item-name">{item.name}</h2>
              <p className="item-id">ID: {item.id}</p>
              <span className={`item-status ${item.status}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


export default Home;
