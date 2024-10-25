import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import style from "./Sidebar.module.css"
import { LoginContext } from '../../Context/LoginContext'


export default function Sidebar(props) {

  let {decodedData , setMood } = useContext(LoginContext);
 let navigate =  useNavigate()


 function moodCreate(){
  setMood("create")
 }

  function logOut (){
    localStorage.removeItem("userToken");

    navigate("/UMS")

  }
 

  return <>

<div className={`${style.colorStyle}`}>
<h1 className=' mt-3 ms-3 fw-semibold fs-4'><span className={`${style.logoColor} me-2`}>|</span>UMS</h1>
  <div className='  d-flex align-items-center flex-column pt-5'>
    <img src={decodedData?.image} className='pt-4 w-50' alt='logo'/>
    <h2 className='mt-4'>{decodedData?.firstName} {decodedData?.lastName}</h2>
    <p className={`${style.pColor} fs-5 lh-sm fw-semibold`}>{decodedData?.username}</p>
    </div>

    <div className={` d-flex flex-column ${style.flexStyle} `}>
    <Link to="/dashboard" className={`fw-medium mt-3 mb-4 ${style.linkStyle} fs-5 fw-semibold`}>
    <i className="fa-solid fa-house "></i>
    Home</Link>
    <Link to="/dashboard/userlist" className={`fw-medium mb-4 ${style.linkStyle} fs-5 fw-semibold`}>
    <i className="fa-solid fa-bookmark "></i>
    Users</Link>
    <Link to="/dashboard/addUser" 
    className={`fw-medium mb-4 ${style.linkStyle} fs-5 fw-semibold`}
    onClick={moodCreate}
    >
    <i className="fa-solid fa-graduation-cap "></i>
    Add User</Link>
    <Link to="/dashboard/Profile" className={`fw-medium mb-4 ${style.linkStyle} fs-5 fw-semibold`}>
    <i className="fa-solid fa-file-invoice-dollar "></i>
    Profile</Link>

    </div>

<div className='d-flex align-items-center justify-content-center'>
<Link to = "#" className={`fw-bold  mb-4 fs-4 fw-semibold mt-5 text-center`} onClick={logOut}>
  Log Out
  <i className="fa-solid fa-arrow-right-from-bracket ms-3 "></i>
  </Link>

</div>



</div>




  
  </>
}
