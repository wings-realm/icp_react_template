import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Auth/Login';
import Navbar from './layouts/Navbar';
import Error404 from './utils/Error404';
import Dashboard from './Home/Dashboard';
import Cart from './Home/Cart';

const App = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/*" element={<Error404 />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
};


export default App;
