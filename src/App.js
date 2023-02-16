import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Login';
import User from './User';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
