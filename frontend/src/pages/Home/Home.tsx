// const Home = () => {


//   return (
//     <div style={{ padding: '2rem', textAlign: 'center' }}>
//       <h1>ホームページ</h1>

      
//     </div>
//   );
// };

// export default Home;


// src/pages/home.tsx
import React from "react";
import './Home.css';


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
    image: "/camera.jpg",
    status: "使用中",
  },
  {
    id: 2,
    name: "デジタルカメラ",
    image: "/camera.jpg",
    status: "空き",
  },
  {
    id: 3,
    name: "プロジェクター",
    image: "/camera.jpg",
    status: "故障中",
  },
  {
    id: 4,
    name: "デジタルカメラ",
    image: "/camera.jpg",
    status: "空き",
  },
  {
    id: 5,
    name: "プロジェクター",
    image: "/camera.jpg",
    status: "故障中",
  },
  {
    id: 6,
    name: "デジタルカメラ",
    image: "/camera.jpg",
    status: "空き",
  },
  {
    id: 7,
    name: "プロジェクター",
    image: "/camera.jpg",
    status: "故障中",
  },
];

const getStatusStyle = (status: Item["status"]) => {
  switch (status) {
    case "使用中":
      return "bg-yellow-100 text-yellow-800";
    case "空き":
      return "bg-green-100 text-green-800";
    case "故障中":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// const Home: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">物品ダッシュボード</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {items.map((item) => (
//           <div
//             key={item.id}
//             className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition-shadow"
//           >
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-full h-40 object-cover rounded-xl mb-4"
//             />
//             <h2 className="text-xl font-semibold text-gray-700">{item.name}</h2>
//             <p className="text-gray-500 text-sm mb-2">ID: {item.id}</p>
//             <span
//               className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${getStatusStyle(
//                 item.status
//               )}`}
//             >
//               {item.status}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

const Home: React.FC = () => {
  return (
    <div className="container">
      <h1 className="title">物品管理一覧</h1>
      <div className="grid">
        {items.map((item) => (
          <div key={item.id} className="card">
            <img src={item.image} alt={item.name} />
            <h2 className="card-title">{item.name}</h2>
            <p className="card-id">ID: {item.id}</p>
            <span className={getStatusStyle(item.status)}>{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
