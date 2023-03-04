import React from 'react';
import Nav from './components/nabar'
import Product from './Pages/Products';
import Add from './Pages/Add'
import { Route, Routes } from 'react-router-dom';

function App() {
  return(
    <>
    <Nav/>
    <Routes>
      <Route path="/product" element={<Product />} />
      <Route path="/add" element={<Add />} />
      <Route path="*" element={<Add />} />
    </Routes>
    </>
  );
}

export default App;
