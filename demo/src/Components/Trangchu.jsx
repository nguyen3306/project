import React, { useEffect, useState, } from 'react'
import Navbar from "./Navbar";
import Container  from "react-bootstrap/Container";
import Swal from "sweetalert2";
// import Voucher from "./Voucher";


function Trangchu(props) {
  const [Todo, setTodo]=useState([]);
  const [edit,setEdit]=useState(false);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

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

const [item,setItem]= useState('')

const submitTodo = ()=>{
  if (item != '') {
    var data = new URLSearchParams();
    data.append('apitoken',localStorage.getItem('token'));
    data.append('todo',item)
    data.append('id',id)
    fetch('https://students.trungthanhweb.com/api/todo',{
      method:'post',
      headers:{
        'Content-type':'application/x-www-form-urlencoded'
        },
        body:data
    }).then((res)=>res.json()).then((res)=>{
      if (res.check == true) {
        Toast.fire({
          icon: "success",
          title: "thêm thành công",
        }).then(()=>window.location.reload())
          
        
      }else if (res.check == false ){
        if (res.msg.apitoken) {
          Toast.fire({
            icon: "error",
            title: res.msg.apitoken,
          })
        }else if (res.msg.todo){
          Toast.fire({
            icon: "error",
            title: res.msg.todo,
          })
        }
      }
    })
  }else {
    Toast.fire({
      icon: "error",
      title: " thiếu todo",
    })
  }
}

const getTodo = ()=>{
    fetch('https://students.trungthanhweb.com/api/todo?apitoken='+localStorage.getItem('token'))
    .then((res)=>res.json()).then((res)=>{
      if (res.check==true) {
        setTodo(res.todo)
         
      }
    })
  
}
const [id,setId]= useState()



const submitDeleteTodo = (i)=>{
    Swal.fire({
        icon:'question',
        text:'Xóa task ?',
        showDenyButton:true,
        showCancelButton:false,
        confirmButtonText:'Đúng',
        denyButtonText:'Không',

    }).then((result) => {
      if (result.isConfirmed) {
        var data = new URLSearchParams();
        data.append('apitoken',localStorage.getItem('token'));
        data.append('id',i);
        fetch ('https://students.trungthanhweb.com/api/deletetodo',{
        method:'post',
        headers:{
          'Content-type':'application/x-www-form-urlencoded',
      },
          body:data
      
    }).then(res => res.json()).then((res)=>{
      if (res.check === true) {
        Toast.fire({
          icon:'success',
          title:'Đã xóa thành công'
        }).then(()=>{
          getTodo();
        })
        
      }
    })
      }
    })

    

}

const submitEdit = async (e)=>{
  e.preventDefault();

  var data = new URLSearchParams();
    data.append('apitoken',localStorage.getItem('token'));
    data.append('todo',item);
    data.append('id',id);

    const response = await fetch ('https://students.trungthanhweb.com/api/updatetodo',{
      method:'POST',
      headers:{
        "Content-type":'application/x-www-form-urlencoded',
      },
      body:data,
      
    });

    const res = await response.json();

    if (res.check = true){
      Toast.fire({
        icon: "success",
        title: "Đã sửa  thành công",
        
      }).then(()=>{
        setItem('')
        setId(0);
        getTodo();
        setEdit(false)
      })
    }
}

const editTodo = (id,old)=>{
  Toast.fire({
    icon: "success",
    title: "Nhập todo để sửa",
  })
  setId(id);
  setItem(old);
  setEdit(true);
}

useEffect(()=>{
  getTodo();
},[])

  return (
    < div >
      <Navbar name={props.name}/>
      <Container>
      <div className="container mt-5 w-100">
      <input className='w-50' type="text" placeholder='todo' value={item} onChange={(e)=>setItem(e.target.value)} />
      {
        edit ?
        <button className='btn btn-warning'  onClick={submitEdit } > Sửa</button>

        :

        <button className='btn btn-primary'  onClick={submitTodo} > thêm</button>

      }

      </div>
      <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Task</th>
      <th scope="col">Hoàn thành</th>
      <th scope="col">Tùy chỉnh</th>
    </tr>
  </thead>
  <tbody>
    
    {Todo && Todo.map((item, index)=>
      <tr key ={index}>
        <th scope="row">{++index}</th>
        <td>{item.note}</td>
        <td>
          {
          item.status==0 ?
          <input type='checkbox' name=''/>
          :

          <input type='checkbox' checked disabled/>
        }
        </td>
        <td>
        <button className='btn btn-danger'  onClick={()=>submitDeleteTodo(item.id)}  >Xóa</button>
        <button className='btn btn-warning' onClick={()=>editTodo(item.id,item.note)}  >Sửa</button>
        </td>
      </tr>
    )}

  </tbody>
</table>
      </Container>
      
    </div>
  )
}

export default Trangchu