import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Homepage, Login, Register, Dashboard, ErrorPage } from './pages';
import Navbar from './components/navbar';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/error' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
