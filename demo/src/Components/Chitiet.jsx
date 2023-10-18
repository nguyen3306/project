import React, { useEffect, useState, } from 'react'
import Navbar from "./Navbar";
import { Container } from 'react-bootstrap';
import '../Components/CSS/Detail.css'
import Swal from 'sweetalert2'

function Chitiet(props) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1700,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  const [product,setProduct] = useState([]);
  const token = localStorage.getItem('token')
  const getProducts = (e)=>{
    fetch('https://students.trungthanhweb.com/api/single?apitoken='+token+'&id='+localStorage.getItem('id'))
    .then((res)=>res.json()).then((res)=>{
      setProduct(res.products)
      console.log(res);
    })
  }


  const addtocart=(id)=>{
    var arr = [];
    if (localStorage.getItem('cart') && localStorage.getItem('cart') != null) {
      arr = JSON.parse(localStorage.getItem('cart'));
    }
    var check = false;
    arr.forEach(el => {
      if (el[0] == id) {
        el[1]++;
        check = true;
      }
    });
    if (check == false) {
      arr.push([Number(id), 1]);
    }
    localStorage.setItem('cart', JSON.stringify(arr));
    Toast.fire({
      icon: 'success',
      title: 'Đã thêm thành công'
    })
  }
  
  
  useEffect(()=>{
    getProducts();
  },[])
  
  return (
    <div className="div">
      <Navbar/>
      {product && product.map((product,index)=>
      <Container key={index}>
      <div className="">
        <div className="row">
          <div className="col">
           
            <div className="imgproduct">
            <img className='' src={"https://students.trungthanhweb.com/images/"+ product.images} alt="" />

            </div>
          </div>
          <div className="col ">
            <div className="col">
            <h1>
                <div className="nameproduct">
                  {product.name}
                  
                </div>
            </h1>
            <div className="productprice">
                <h1>
                {Intl.NumberFormat('en-US').format(product.price)}
                </h1>
            </div>
            </div>
            <div className="col addtocart">
            <button onClick={()=>{addtocart((localStorage.getItem('id')))}} className='btn btn-primary'>Thêm vào giỏ hàng</button>
            </div>
          </div>
        </div>
        <div className="div">
            {(product.content)}
        </div>
      </div>
      </Container>
      )}
    </div>
  )
}
export default Chitiet