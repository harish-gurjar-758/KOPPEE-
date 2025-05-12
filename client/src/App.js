import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/utils/NavBar';
import Home from './components/Pages/Home';
import Reservation from './components/Pages/Reservation';
import AdminBlock from './adminBlock/AdminBlock';
import Menu from './components/Pages/Menu';


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
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
