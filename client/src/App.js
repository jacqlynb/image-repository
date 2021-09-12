import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">Image Repository</header>
      <form className="add-image">
        <p>Add image</p>
        <label className="add-image__label">
          Url:
          <input type="text" className="add-image__input" />
        </label>
        <label className="add-image__label">
          Title:
          <input type="text" className="add-image__input" />
        </label>
        <label className="add-image__label">
          Tags (separated by comma):
          <input
            type="text"
            placeHolder="e.g. person, flower, chair"
            className="add-image__input"
          />
        </label>
        <input type="submit" value="submit" className="add-image__submit" />
      </form>
    </div>
  );
}

export default App;
