import React, { useState } from 'react';
import Nav from './components/nabar'
import Product from './Pages/Products';
import Add from './Pages/Add'
import { Route, Routes } from 'react-router-dom';

function App() {
  const [editID,setEditID]= useState({id:"",category:""})
  return(
    <>
    <Nav/>
    <Routes>
      <Route path="/product" element={<Product setEditID={setEditID}/>} />
      <Route path="/add" element={<Add editID={editID} setEditID={setEditID} />} />
      <Route path="*" element={<Product setEditID={setEditID}/>} />
    </Routes>
    </>
  );
}

export default App;
