import React, { useContext, useState } from 'react'

import style from "./Login.module.css"
import { Navigate } from 'react-router-dom';
import axios from "axios";
import { useForm } from "react-hook-form";

import { LoginContext } from '../../Context/LoginContext';
import { Circles } from 'react-loader-spinner';


export default function Login() {

 let { getUserData  } = useContext(LoginContext)
 
 const { register, handleSubmit, formState: { errors } } = useForm();

 const [loginError, setLoginError] = useState("");
 let [data1 , setData] = useState ({})
 let [loading , setLoading] = useState(false);

 async function onSubmit (value){
  setLoading()
     try {
       let {data} = await axios.post('https://dummyjson.com/auth/login' , value);
       setData(data);   
       localStorage.setItem("userToken" , data1?.accessToken)
       getUserData() 
       setLoginError("good");


       
     } catch (error) {
         setLoginError("bad");

       
     }
   }

  return <>
<div className={`${style.loginStyle } vh-100 d-flex justify-content-center align-items-center `}>

<div className={`shadow-lg bg-white rounded-3 p-5 ${style.boxStyle}`}>
<h1 className=' mt-3 ms-3 fw-semibold fs-2 mb-4'><span className={`${style.logoColor} me-2`}>|</span>User Management System</h1>
<h4 className=' text-center fw-semibold lh-sm'> Sign In</h4>
<p className=' lh-sm text-secondary text-center'> Enter your credentials to access your account</p>

<form onSubmit={handleSubmit(onSubmit)} className=' d-flex flex-column align-content-center mt-5'>

{loginError === "bad"&& <>
 <div className="alert alert-danger" role="alert">
     invalid user name or password
</div>
</>
}
{loginError === "good"&& <>

<Navigate to="/dashboard" replace/>
</>
}
<label htmlFor="username" className=' text-secondary fw-medium'>User Name</label>
<input type="text"
id='username'
 className='text-black w-100 border-1 border-secondary w-100 ps-3 rounded-3'
  placeholder='enter your username'
  {...register("username" , {
    required:"Username is required" ,   minLength: {
      value: 4, 
      message: "Username must be at least 4 characters long"
    } 
  }) }
  />
  {errors.username ? <>
    <div className="alert alert-danger py-1 mt-1" role="alert">
      {errors.username.message}
</div>
  </> : null }
<br/>
<label htmlFor="password" className=' text-secondary fw-medium'>Password</label>
<input type="password"
 id='password' 
 className=' text-black  w-100 border-1 border-secondary w-100 ps-3 rounded-3'
  placeholder='enter your password'
  {...register("password" , {required : "password is required" ,
    // pattern: {
    //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 
    //   message: "Password must be at least 8 characters, include a letter and a number"
    // }
  })}
  />
  {errors.password ? <>
    <div className="alert alert-danger  py-0 mt-1" role="alert">
      {errors.password.message}
</div>
  </> : null}

<button className={`w-100 text-white text-center ${style.btnStyle} rounded-2 border-0 mt-4`}
type='submit'
> {loading ? <>
  <div className=' d-flex justify-content-center align-items-center'>
  <Circles
  height="23"
  width="25"
  color="white"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
  </div>

</> : "Log In"}</button>


</form>
</div>

  </div>
  
  </>
}
