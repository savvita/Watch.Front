import Index from './layouts/Index/Index';
import Catalog from './layouts/Catalog/Catalog';
import About from './layouts/About/About';
import Orders from './layouts/Orders/Orders';
import Admin from './layouts/Admin/Admin';
import Manager from './layouts/Manager/Manager';
import Categories from './layouts/Categories/Categories';
import Producers from './layouts/Producers/Producers';
import Watches from './layouts/Watches/Watches';
import WatchPage from './layouts/WatchPage/WatchPage';
import OrderView from './layouts/OrderView/OrderView';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="container p-0">
      <Router>
        <Routes>
          <Route path="/" exact element={ <Index /> } />        
          <Route path="/catalog" element={ <Catalog /> } />        
          <Route path="/about" element={ <About /> } />  
          <Route path="/myorders" element={ <Orders isManagerMode={ false } /> } />  
          <Route path="/admin" element={ <Admin /> } />  
          <Route path="/manager" element={ <Manager /> }>  
            <Route path="categories" element={ <Categories /> } />
            <Route path="producers" element={ <Producers /> } />
            <Route path="watches" element={ <Watches /> } />
            <Route path="orders" element={ <Orders isManagerMode={ true } /> } />
          </Route>
          <Route path="/watches/:id" element={ <WatchPage /> } />
          <Route path="/orders/:id" element={ <OrderView /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
