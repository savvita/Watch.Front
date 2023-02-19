import Home from './layouts/Home/Home';
import About from './layouts/About/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="container p-0">
      <Router>
        <Routes>
          <Route path="/" element={ <Home /> } />        
          <Route path="/about" element={ <About /> } />  
        </Routes>
      </Router>
    </div>
  );
}

export default App;
