import React from 'react'
import Navbar from "./Navbar";
import Slider from "./Slider"
import Container  from "react-bootstrap/Container";
import Product from "./Product";
import Voucher from "./Voucher";
import Footer from "./Footer";

function Todo(props) {
  return (
    <>
    <div className="div">
    <Navbar name={props.name}/>
    </div>
      
    <Slider/>
    <Voucher/>
    <Product/>
    <Footer/>
    </>
  )
}

export default Todo