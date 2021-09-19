import { useEffect, useState, useRef } from 'react';
import './App.css';

export function App() {
  const [images, setImages] = useState(null);
  const formRef = useRef();

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    const response = await fetch('/image');
    const imageData = await response.json();
    setImages(imageData);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const labels = event.target.labels.value;

    try {
      const response = await fetch(`/image?labels=${labels}`);
      const imageData = await response.json();
      setImages(imageData);
    } catch (error) {
      console.log(error);
    }
    formRef.current.reset();
  }

  const imageMarkup =
    images && images.length > 0 ? (
      images.map((image) => {
        return (
          <div className="image">
            <img src={image.image_url} />
            <p className="image__title">{formatImageTitle(image)}</p>
          </div>
        );
      })
    ) : (
      <p className="image--no-results">No results found</p>
    );

  function formatImageTitle(image) {
    const { title, author, date_display: date } = image;
    return `${title ? title : 'Untitled'} 
           (${author ? author : 'unknown'}${date ? ', ' + date : ''})`;
  }

  return (
    <div className="app">
      <header className="app__header">Image Repository</header>
      <p className="app__description">
        Search over 20,000 art images by content labels
      </p>
      <form className="search-form" ref={formRef} onSubmit={handleSubmit}>
        <label className="search-form__label">
          Labels:
          <input
            type="text"
            name="labels"
            autoComplete="off"
            className="search-form__input"
          />
        </label>
        <input type="submit" value="search" className="search-form__submit" />
      </form>
      <p className="search__instructions">
        Enter comma separated values, for example:
      </p>
      <div className="search__examples">
        <p className="search__example">tree</p>
        <p className="search__example">painting, mountain</p>
        <p className="search__example">building, arch, column</p>
      </div>
      <div className="images">{imageMarkup}</div>
    </div>
  );
}

export default App;
