import React, { useEffect, useState, } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getProducts } from "../redux/productsSlice";
import { useDispatch,useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Chitiet from "./Chitiet";
import "../Components/CSS/Products.css";
import Swal from 'sweetalert2'



function Products() {
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
  const [products,setProducts] = useState([]);
  const [sp,setSP] = useState([]);
  const [limit,setLimit] = useState(5);
  const [count,setCount] = useState(0);
  const [search,setsearch] = useState([])
  const [show,showsearch]=useState(true)
  const getValue = async ()=>{
    fetch('https://students.trungthanhweb.com/api/home1?apitoken='+localStorage.getItem('token')+'&limit='+limit)
    .then((res)=>res.json()).then((result) =>{
      
        if (result.products.length > 0) {
        setProducts(result.products);
        setCount(result.count)
        }
      
    })
  }

const searchProducts=()=>{
  fetch('https://students.trungthanhweb.com/api/getSearchProducts?apitoken='+localStorage.getItem('token')+'&name='+search)
    .then((res)=>res.json()).then((res) =>{
        console.log(res);
        
        setSP(res.data);
        showsearch(false);
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

  const showmore=()=>{
   setLimit(limit+5);
   getValue();
  }
  useEffect(()=>{
    getValue();
  },[limit]);
  return (
    <>
    <h1 className='text-center'>Sản phẩm</h1>
    <div className="search">
    <input placeholder='Tìm kiếm sản phẩm' className='timkiemsp' onChange={(e) => setsearch(e.target.value)} type="text"/>
    <Button onClick={()=>{searchProducts()}}>Tìm</Button>
    </div>
      <div className='row '>
        {
          show ?
          <div className="row">
            {products  && products.map((products,index)=>
                <ul className='col p-3 text-center showproducts' key={index}>
                <Card className='card' style={{ width: '18rem' }}>
                    <Card.Img className='productsimg' variant="top" src={"https://students.trungthanhweb.com/images/"+ products.images} />
                    <Card.Body>
                      <Card.Title className=''>{products.name}</Card.Title>
                      <Card.Text>
                        Giá tiền: {Intl.NumberFormat('en-US').format(products.price)} 
                      </Card.Text>
                      <Card.Text>
                        Thương hiệu: {products.brandname} 
                      </Card.Text>
                      <div className="col">
                      <Button onClick={()=>{localStorage.setItem('id',products.id)}} href='/chitiet/' >Chi tiết</Button>
                      </div>
                      <div className="col mt-2">
                        <Button onClick={()=>{addtocart(products.id)}}>Thêm vào giỏ hàng</Button>
                      </div>
                      
                      
                    </Card.Body>
                  </Card>
                        </ul>
              )}


              <div className="row">
                <div className="col"></div>
              <Button id='showmorebtn' className='w-50 m-0-auto' onClick={()=>{showmore()}}>Xem thêm</Button>
              <div className="col"></div>
              </div>
          </div>



          :



          <div className="row">
            {sp  && sp.map((sp,index)=>
            <ul className='col p-3 text-center showproducts' key={index}>
            <Card className='card' style={{ width: '18rem' }}>
                <Card.Img className='productsimg' variant="top" src={"https://students.trungthanhweb.com/images/"+ sp.images} />
                <Card.Body>
                  <Card.Title className=''>{sp.name}</Card.Title>
                  <Card.Text>
                    Giá tiền: {Intl.NumberFormat('en-US').format(sp.price)} 
                  </Card.Text>
                  <Card.Text>
                    Thương hiệu: {sp.brandname} 
                  </Card.Text>
                  <div className="col">
                  <Button onClick={()=>{localStorage.setItem('id',sp.id)}} href='/chitiet/' >Chi tiết</Button>
                  </div>
                  <div className="col mt-2">
                    <Button onClick={()=>{addtocart()}}>Thêm vào giỏ hàng</Button>
                  </div>
                  
                  
                </Card.Body>
              </Card>
                    </ul>
          )}


          <div className="row">
            <div className="col"></div>
          <Button id='showmorebtn' className='w-50 m-0-auto' onClick={()=>{showmore()}}>Xem thêm</Button>
          <div className="col"></div>
          </div></div>
        }      
      </div>


 
 </>
  )
}

export default Products