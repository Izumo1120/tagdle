SET NAMES 'utf8mb4';
USE sample_db;

-- Users table
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    student_id VARCHAR(50),
    email VARCHAR(255),
    password VARCHAR(255)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Categories table
CREATE TABLE Categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Images table
CREATE TABLE Images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_name MEDIUMBLOB
);

-- Locations table
CREATE TABLE Locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Items table
CREATE TABLE Items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    category_id INT,
    identifier VARCHAR(255),
    image_id INT,
    location_id INT,
    status BOOLEAN DEFAULT FALSE,
    qrpath VARCHAR(255),
    created_at DATE,
    FOREIGN KEY (category_id) REFERENCES Categories(id),
    FOREIGN KEY (image_id) REFERENCES Images(id),
    FOREIGN KEY (location_id) REFERENCES Locations(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Histories table
CREATE TABLE Histories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT,
    user_id INT,
    borrow_date DATE,
    return_date DATE DEFAULT NULL,
    FOREIGN KEY (item_id) REFERENCES Items(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Users table
INSERT INTO Users (name, student_id, email, password) VALUES
('山田 太郎', 'S12345', 'yamada@example.com', 'pass123'),
('佐藤 花子', 'S23456', 'sato@example.com', 'pass456'),
('高橋 一郎', 'S34567', 'takahashi@example.com', 'pass789');

-- Categories table
INSERT INTO Categories (name) VALUES
('電子機器'),
('書籍'),
('家具');

-- Images table (ダミーのためNULL)
INSERT INTO Images (image_name) VALUES
(NULL),
(NULL),
(NULL);

-- Locations table
INSERT INTO Locations (name) VALUES
('図書館'),
('教室A'),
('倉庫B');

-- Items table
INSERT INTO Items (
    name,
    category_id,
    identifier,
    image_id,
    location_id,
    status,
    qrpath,
    created_at
) VALUES
('ノートパソコン', 1, 'ABC123', 1, 1, TRUE, '/qr/abc123.png', '2025-07-01'),
('プログラミング入門書', 2, 'DEF456', 2, 2, FALSE, '/qr/def456.png', '2025-07-02'),
('椅子', 3, 'GHI789', 3, 3, TRUE, '/qr/ghi789.png', '2025-07-03');

-- Histories table
-- item_id = 1〜3, user_id = 1〜3
INSERT INTO Histories (item_id, user_id, borrow_date, return_date) VALUES
(1, 1, '2025-07-03', NULL),
(2, 2, '2025-07-04', '2025-07-10'),
(3, 3, '2025-07-05', NULL);

