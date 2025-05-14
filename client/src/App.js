import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/utils/NavBar';
import Home from './components/Pages/Home';
import Reservation from './components/Pages/Reservation';
import AdminBlock from './adminBlock/AdminBlock';
import Menu from './components/Pages/Menu';
import FoodDetailed from './components/Pages/FoodDetailed';
import Offers from './components/Pages/Offers';
import Shops from './components/Pages/Shops';


function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/reservation' element={<Reservation />} />
          <Route path='/coffee-shop/admin-block/' element={<AdminBlock />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/food-detailed-section/:id" element={<FoodDetailed />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='shops-location' element={<Shops />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
