import Icon from './logo.png';
import './App.css';
import Register from './Register';
import Cost from './Cost';
import Report from './Report';

// The App component.
function App() {
  return (
    <div className="App">
      <h1 className="header">
        <img width="40px" height="40px" src={Icon} />
        ניהול הוצאות
      </h1>
      <div className="container">
        <Register />
        <Cost />
        <Report />
      </div>
    </div>
  );
}

export default App;
