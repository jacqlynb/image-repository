CREATE TABLE IF NOT EXISTS images(
  image_id INTEGER AUTO_INCREMENT PRIMARY KEY, 
  image_url VARCHAR(255),
  image_title VARCHAR(255),
  image_labels VARCHAR(255)
);
