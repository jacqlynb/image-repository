CREATE TABLE IF NOT EXISTS images(
  id INTEGER AUTO_INCREMENT PRIMARY KEY, 
  image_id VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  title TEXT,
  author TEXT,
  date_display TEXT,
  labels TEXT
);
