// src/pages/ItemDetail.tsx
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./Itemdetails.css";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";


type Item = {
  id: number;
  name: string;
  identifier: string;
  image: string;
  status: "使用中" | "空き" | "故障中";
};

const ItemDetail: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const state = location.state as { item?: Item };
  const item = state?.item;
  const navigate = useNavigate();

  const qrRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch("http://localhost:8000/items");
        const data = await res.json();

        const found = data.find((i: any) => i.id === Number(id));
        if (found) {
          const statusMap = {
            0: "空き",
            1: "使用中",
            2: "故障中",
          };

          const mapped: Item = {
            id: found.id,
            name: found.name,
            identifier: found.identifier,
            image: "/camera.jpg", // 画像は今のままで
            status: statusMap[found.status] ?? "空き",
          };

          setItem(mapped);
        }
      } catch (err) {
        console.error("取得エラー:", err);
      }
    };

    fetchItem();
  }, [id]);

  const getStatusClass = (status: Item["status"]) => {
    switch (status) {
      case "使用中":
        return "status-yellow";
      case "空き":
        return "status-blue";
      case "故障中":
        return "status-red";
      default:
        return "";
    }
  };

  const downloadPdfWithSize = (size: number) => {
    const canvas = qrRef.current;
    if (!canvas) return;

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [size + 20, size + 20],
    });

    pdf.addImage(imgData, "PNG", 10, 10, size, size);
    pdf.save(`item_${item?.id}_qr_${size}mm.pdf`);
  };

  const history = [
    { date: "2024/07/01", user: "田中太郎", purpose: "授業用" },
    { date: "2024/06/20", user: "山田花子", purpose: "会議撮影" },
    { date: "2024/06/01", user: "佐藤健", purpose: "研究発表" },
  ];

  if (!item) {
    return (
      <>
        <Header />
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>物品が見つかりませんでした。</h2>
        </div>
      </>
    );
  }

  const qrUrl = `http://localhost:8000/items/${item.identifier}/status`;

  return (
    <>
      <Header />
      <div className="detail-wrapper" style={{ marginTop: "3rem" }}>
        <div className="detail-container">
          <h1 className="detail-title">{item.name}</h1>
          <img src={item.image} alt={item.name} className="detail-image" />
          <p className="detail-info"><strong>ID:</strong> {item.id}</p>
          <p className="detail-info"><strong>管理番号:</strong> {item.identifier}</p>
          <p className="detail-info">
            <strong>状態:</strong>{" "}
            <span className={`detail-status ${getStatusClass(item.status)}`}>
              {item.status}
            </span>
          </p>
        </div>

        <div className="history-container">
          <h2 className="history-title">使用履歴</h2>
          <ul className="history-list">
            {history.map((record, index) => (
              <li key={index} className="history-item">
                <p><strong>{record.date}</strong> - {record.user}</p>
                <p className="history-purpose">用途: {record.purpose}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* QRコードセクション */}
      <div
        style={{
          marginTop: "3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <QRCodeCanvas value={qrUrl} size={256} includeMargin={true} ref={qrRef} />
        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={() => downloadPdfWithSize(50)}>小（50mm）PDF</button>
          <button onClick={() => downloadPdfWithSize(80)}>中（80mm）PDF</button>
          <button onClick={() => downloadPdfWithSize(120)}>大（120mm）PDF</button>
        </div>

        <button
          style={{
            marginTop: "2rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          ホーム画面に戻る
        </button>
      </div>
    </>
  );
};

export default ItemDetail;
