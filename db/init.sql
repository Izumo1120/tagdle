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

INSERT INTO Categories (name) VALUES ('電子機器'), ('書籍');
INSERT INTO Images (image_name) VALUES (NULL), (NULL);  -- ダミーなのでNULLでも可
INSERT INTO Locations (name) VALUES ('図書館'), ('教室A');

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
('プログラミング入門書', 2, 'DEF456', 2, 2, FALSE, '/qr/def456.png', '2025-07-02');


 