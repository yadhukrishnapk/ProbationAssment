import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home/Home';
import About from './components/About/About';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import Providers from './Providers';

import Search from './components/Search/Search';


function AppContent() {
  return (
    <Providers>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path='/searchnew' element={<Search/>}/>
    </Routes>
    </Providers>
  );
}

function App() {
  return (

      <Router>
        <AppContent />
        <ToastContainer />
      </Router>
  );
}

export default App;
