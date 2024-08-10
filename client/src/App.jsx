import {BrowserRouter, Routes, Route}  from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';

export default function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Routes>
    </BrowserRouter>
  );
}