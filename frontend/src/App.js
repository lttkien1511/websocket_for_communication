import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Websocket from './pages/Websocket';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Websocket/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
