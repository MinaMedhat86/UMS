import React, { useContext } from 'react'

import style from "./Profile.module.css"
import { LoginContext } from '../../Context/LoginContext'

export default function Profile() {

let { decodedData } =   useContext(LoginContext)
  return <>
  
  <div className=' container-fluid py-4 overflow-hidden'>
    <div className=' d-flex justify-content-start '>
        <h2  className=' fw-semibold ms-3' > Profile</h2>
  
    </div>
    <hr className=' mt-3 mx-4'/>

    <div className=' container-fluid d-flex justify-content-center align-items-center my-5'>
      <div className=' bg-white rounded-2 shadow  w-75 position-relative mt-5'>
      <img src={decodedData?.image} className={` ${style.imgStyle} rounded-circle position-absolute start-50 translate-middle`} alt={decodedData?.username} />
<div className='row mt-3 p-5 g-4'>

  <div className='col-md-6'>
    <p className='fs-6 text-secondary ms-1 mb-1'>FirstName</p>
    <div className={`${style.divStyle} w-100 px-3 rounded-2`}>
      <h1 className='text-black fw-bold fs-5 py-2'>{decodedData?.firstName}</h1>
    </div>
  </div>

  <div className='col-md-6'>
    <p className='fs-6 text-secondary ms-1 mb-1'>Last Name</p>
    <div className={`${style.divStyle} w-100 px-3 rounded-2`}>
      <h1 className='text-black fw-bold fs-5 py-2'>{decodedData?.lastName}</h1>
    </div>
  </div>

  <div className='col-md-6'>
    <p className='fs-6 text-secondary ms-1 mb-1'>ID</p>
    <div className={`${style.divStyle} w-100 px-3 rounded-2`}>
      <h1 className='text-secondary fs-5 py-2'>{decodedData?.id}</h1>
    </div>
  </div>

  <div className='col-md-6'>
    <p className='fs-6 text-secondary ms-1 mb-1'>Email</p>
    <div className={`${style.divStyle} w-100 px-3 rounded-2`}>
      <h1 className='text-secondary fs-5 py-2'>{decodedData?.email}</h1>
    </div>
  </div>

  <div className='col-md-6'>
    <p className='fs-6 text-secondary ms-1 mb-1'>Nick Name</p>
    <div className={`${style.divStyle} w-100 px-3 rounded-2`}>
      <h1 className='text-secondary fs-5 py-2'>{decodedData?.username}</h1>
    </div>
  </div>

  <div className='col-md-6'>
    <p className='fs-6 text-secondary ms-1 mb-1'>Gender</p>
    <div className={`${style.divStyle} w-100 px-3 rounded-2`}>
      <h1 className='text-secondary fs-5 py-2'>{decodedData?.gender}</h1>
    </div>

    </div>
  </div>
   </div>

      </div>
    </div>
  
  
  </>
}
