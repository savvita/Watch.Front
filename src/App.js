import Home from './layouts/Home/Home';
import About from './layouts/About/About';
import Orders from './layouts/Orders/Orders';
import Users from './layouts/Users/Users';
import Manager from './layouts/Manager/Manager';
import Categories from './layouts/Categories/Categories';
import Producers from './layouts/Producers/Producers';
import Watches from './layouts/Watches/Watches';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="container p-0">
      <Router>
        <Routes>
          <Route path="/" element={ <Home /> } />        
          <Route path="/about" element={ <About /> } />  
          <Route path="/myorders" element={ <Orders isManagerMode={ false } /> } />  
          <Route path="/admin" element={ <Users /> } />  
          <Route path="/manager" element={ <Manager /> }>  
            <Route path="categories" element={ <Categories /> } />
            <Route path="producers" element={ <Producers /> } />
            <Route path="watches" element={ <Watches /> } />
            <Route path="orders" element={ <Orders isManagerMode={ true } /> } />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
