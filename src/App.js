import Header from './components/Header/Header';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="container p-0">
      <Router>
        <Routes>
          <Route path="/" element={ <Home /> } />        
          <Route path="/about" element={ <><Header /><h1>About</h1></> } />  
        </Routes>
      </Router>
    </div>
  );
}

export default App;
