// import react from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Trangchu from "./Components/Trangchu";
import Login from "./Components/Login";
import Todo from "./Components/Todo";
import Chitiet from "./Components/Chitiet";
import { getProducts } from "./redux/productsSlice";
import { useDispatch,useSelector } from 'react-redux';
import Cart from "./Components/Cart";
import React, { useEffect, useState, } from 'react'


function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getProducts());
  },[]);
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/Todo" element={<Trangchu name='chan nguyen'/>} />
        <Route exact path="/Login" element={<Login/>} />
        <Route exact path="/chitiet/" element={<Chitiet/>} />
        <Route path="/cart" element={<Cart/>}/>
        <Route exact path="/" element={<Todo name='chan nguyen'/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
