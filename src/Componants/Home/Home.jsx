import React, { useContext, useEffect, useState } from 'react'

import style from "./Home.module.css"
import { LoginContext } from '../../Context/LoginContext'
import { useNavigate } from 'react-router-dom';
import SimplCharts from './SimplCharts';
import CircelChart from './CircelChart';
import ComposedCharts from './ComposedCharts';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';



export default function Home() {



let {setMood} = useContext(LoginContext);
let navigate = useNavigate();

function addUser(){
  navigate("/dashboard/addUser");
  setMood("create")

}

function profileDirection (){
  navigate("/dashboard/profile")
}

let [users , setUsers] = useState([]);
let [loading , setLoading] = useState(true)

async function getData(){
  try {
      let res = await axios.get("https://dummyjson.com/users");
      setUsers(res.data.users);
      setLoading(false);
    
      
  } catch (error) {
      console.log(error);
      
  }
}
useEffect(()=>{
  getData()
} , [])

let incomArr = [
  {id : 1 , text : "Income" , money : "$47.482" , increase : "3.65%" , bgColor : "text-success bg-success-subtle " },
  {id : 2 , text : "Orders" , money : "2.542" , increase : "-5.25%" , bgColor : "text-danger bg-danger-subtle " },
  {id : 3 , text : "Activity" , money : "16.300" , increase : "4.65%" , bgColor : "text-success bg-success-subtle " },
  {id : 4 , text : "Revenue" , money : "$20.120" , increase : "2.35%" , bgColor : "text-success bg-success-subtle " },
  {id : 4 , text : "Users" , money : "+100" , increase : "2.35%" , bgColor : "text-success bg-success-subtle " },


]

  return <>

{loading ? <>
<div className=' vh-100 d-flex justify-content-center align-items-center'>
<Circles
  height="80"
  width="80"
  color="#F8D442"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
</div>

</> :<div className=' container-fluid py-4'>
    <div className=' d-flex justify-content-between '>
        <h2  className=' fw-semibold ms-3' > UMS Dashboard</h2>
        <div>
        <button className=' btn btn-warning text-white px-3 py-1 me-3' onClick={()=>{addUser()}}>Add New User</button>
        <button className=' btn btn-secondary  text-white px-3 py-1 me-3' onClick={profileDirection}>
        <i className="fa-regular fa-user me-2"></i>
          profile</button>
        </div>
      
    </div>
    <hr className=' mt-3 mx-4'/>

    <div className=' container-fluid'>
    <div className='px-4 row gap-2 d-flex justify-content-between'>
 
      {
  incomArr.map((item)=>{
    return <>
    
    <div key={item.id} className="col-md-2 bg-white shadow rounded-2 p-3 ">
    <div  >
<div className=' d-flex justify-content-between'>
  <p className=' text-secondary fs-6 fw-semibold'> {item.text}</p>
  <div 
  className={`${style.iconStyle} bg-primary opacity-50 text-white rounded-circle d-flex justify-content-center align-items-center`}>
  <i className="fa-solid fa-dollar-sign"></i>
  </div>

</div>
<h2 className=' fw-semibold'>{item.money}</h2>
<div className=' d-flex justify-content-start'>
  <p className={`fs-6 rounded-2 px-1 py-0 ${item.bgColor}`}> {item.increase}</p>
  <p className=' text-secondary fw-semibold ms-2'>Since Last Week</p>
</div>

</div>
    </div>

    </>
  })
}
      </div>
    </div>

    <div className=' container-fluid mt-5'>
    <div className='px-4 row d-flex gy-4 justify-content-between'>

      <div className="col-md-7 bg-white shadow rounded-2">
      <SimplCharts/>
      </div>

      <div className='col-md-4 bg-white shadow rounded-2'>

        <CircelChart/>
      </div>

    </div>
    </div>

<div className=' container-fluid mt-5'>
<div className="row px-4 ">
      <div className="col-md-3 bg-white shadow rounded-2 ">
        <ComposedCharts/>
      </div>
      <div className={`col-md-9 ps-4 overflow-y-scroll ${style.tableStyle} rounded-2  `}>
      <table className={`table align-middle table-hover `}>
  <thead >
    <tr >
      <th scope="col" className={`${style.trStyle}`}>First Name</th>
      <th scope="col" className={`${style.trStyle}`}>LastName</th>
      <th scope="col" className={`${style.trStyle}`}>Email</th>
      <th scope="col" className={`${style.trStyle}`}>Phone</th>
      <th scope="col" className={`${style.trStyle}`}>Birth Of Date</th>


    </tr>
  </thead>
  <tbody>
{
    users.map((item)=>{
return <>
    <tr key={item.id} >
      <th  >
      <td className=''>{item.firstName}</td>
      </th>
      <td className=''>{item.lastName}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>{item.birthDate}</td>


    </tr>



</>
    })
}
  </tbody>
</table>
      </div>
    </div>
</div>


</div> }





      </>
}
