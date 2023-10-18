import React, { useEffect, useState } from 'react'
import { getCates } from '../redux/cateSlice';
import Swal from "sweetalert2";
import { getBrand } from "../redux/brandSlice";
import { useDispatch, useSelector } from "react-redux";

function Navbar(props) {
  const [count,setCount]=useState(0);

  const [login, setLogin]= useState(false);
  const checkLogin=()=>{
    if (localStorage.getItem('token') && localStorage.getItem('token')!=null){
      setLogin(true);
      
    }else{
      Toast.fire({
        icon: "error",
        title: "Bạn chưa đăng nhập",
      }).then(() => {
        window.location.href="/Login";
      });

    }
  }
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const Logout=()=>{
    localStorage.clear();
    Toast.fire({
      icon: "success",
      title: "Đăng xuất thành công",
    }).then(() => {
      window.location.href="/Login";
    });
  }
  const dispatch = useDispatch();
  const {brands,loading1}=useSelector((state)=>state.brand);
  const {cates,loading}=useSelector((state)=>state.cate);
  
  useEffect(()=>{
    dispatch(getBrand());
    dispatch(getCates());
    checkLogin();
  },[]);
  

  return (
   <>
   
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href='/' >Trang chủ</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" type="button" onClick={Logout} >Đăng xuất</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href='/Login' >Đăng nhập</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Loại sản phẩm
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            {cates && cates.map((item,index)=>
            <li key={index}><a className="dropdown-item" href={`/cateprod/${item.id}`}>{item.name}</a></li>
            )}
          </ul>
        </li>        
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle"  id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Thương hiệu
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            {brands && brands.map((item,index)=>
            <li key={index}><a className="dropdown-item" href={`/brandsprod/${item.id}`}>{item.name}</a></li>
            )}
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href='/Todo'>Todo</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href='/bot'>Bot</a>
        </li>
      </ul>
      <form className="d-flex">
        <a href={'/cart'} className="ms-1 btn btn-outline-warning"><i style={{"fontSize":'16px'}} className="bi bi-bag-check-fill">Giỏ hàng </i> </a>

        <img width={50} src="https://portal.vhu.edu.vn/static/icons/Flag_of_Vietnam.svg" alt="" />
      </form>
    </div>
  </div>
</nav>
   </>
  );
}

export default Navbar;