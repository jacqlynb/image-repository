import { useEffect, useState, useRef } from 'react';
import './App.css';

export function App() {
  const [images, setImages] = useState(null);
  const formRef = useRef();

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    const response = await fetch('http://localhost:8080/image');
    const imageData = await response.json();
    setImages(imageData);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const labels = event.target.tags.value;

    try {
      const response = await fetch(
        `http://localhost:8080/image?labels=${labels}`
      );
      const imageData = await response.json();
      setImages(imageData);
    } catch (error) {
      console.log(error);
    }
    formRef.current.reset();
  }

  const imageMarkup = images
    ? images.map((image) => {
        return (
          <div className="image">
            <img src={image.image_url} />
            <p className="image__title">{formatImageTitle(image)}</p>
          </div>
        );
      })
    : null;

  function formatImageTitle(image) {
    const { title, author, date_display: date } = image;
    return `${title ? title : 'Untitled'} 
           (${author ? author : 'unknown'}${date ? ', ' + date : ''})`;
  }

  return (
    <div className="app">
      <header className="app-header">Image Repository</header>
      <form className="add-image" ref={formRef} onSubmit={handleSubmit}>
        <p>Search images</p>
        {/* <label className="add-image__label">
          Url:
          <input type="text" name="url" className="add-image__input" />
        </label>
        <label className="add-image__label">
          Title:
          <input type="text" name="title" className="add-image__input" />
        </label> */}
        <label className="add-image__label">
          Tags (separated by comma):
          <input
            type="text"
            name="tags"
            placeholder="e.g. person, flower, chair"
            className="add-image__input"
          />
        </label>
        <input type="submit" value="submit" className="add-image__submit" />
      </form>
      <div className="images">{imageMarkup}</div>
    </div>
  );
}

export default App;
