import {BrowserRouter, Routes, Route}  from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';

export default function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Home />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
    </Routes>
    </BrowserRouter>
  );
}