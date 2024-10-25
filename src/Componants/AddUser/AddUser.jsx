import React, { useContext, useEffect, useState } from 'react'

import style from "./AddUser.module.css"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer , toast } from 'react-toastify';
import { Circles } from 'react-loader-spinner';
import { LoginContext } from '../../Context/LoginContext';


export default function AddUser() {
  let {objUser , setObjUser } =  useContext(LoginContext);
  let {mood , setMood} = useContext(LoginContext)

  const { register, handleSubmit, formState: { errors }  } = useForm({defaultValues : {
    firstName : mood === "create" ? "" :  objUser.firstName , 
lastName : mood === "create" ? "" : objUser.lastName,
age : mood === "create" ? "" : objUser.age,
phone : mood === "create" ? "" : objUser.phone,
birthDate : mood === "create" ? "" : objUser.birthDate,
email : mood === "create" ? "" : objUser.email

  }
});

  let [loading , setLoading] = useState(false)




async  function addUser(value){
setMood("create")
  setLoading(true)

  try {
    await    axios.post("https://dummyjson.com/users/add" ,{value , body: JSON.stringify(objUser)});
toast.success("Add User Successfuly");
setLoading(false)
  } catch (error) {
    console.log(error);
    toast.error("something wrong happen")
    setLoading(false)
    setMood("create")

  }


  }



  async function updateUser(value ) {
    setMood("update")
  setLoading(true)

  try {
    let res = await  axios.put(`https://dummyjson.com/users/${objUser.id}` , {value})
    console.log(res);
    toast.success("Update User Successfuly");
    setMood("update")
    setLoading(false)


    


  } catch (error) {
    console.log(error);
    toast.error("something wrong happen")
    setLoading(false)
    setMood("update")
  }
  }



  return <>
  <ToastContainer/>
  <div className=' container-fluid py-4 overflow-hidden'>
    <div className=' d-flex justify-content-start '>

      {
        mood === "create" && <>
                <h2  className=' fw-semibold ms-3' > Add User</h2>
        </>
      }

{
        mood === "update" && <>
                <h2  className=' fw-semibold ms-3' > Update User</h2>
        </>
      }
  
    </div>
    <hr className=' mt-3 mx-4'/>

    <div className=' container-fluid d-flex justify-content-center align-items-center my-5'>
      <div className=' bg-white rounded-2 shadow  w-75'>

        
      <form onSubmit={handleSubmit(mood ==="create" ?addUser : updateUser)} >


      <div className='row mt-3 p-5 g-4 '>


<div className="col-md-6">
  <label htmlFor="firstName" className=' text-secondary'>First Name</label>
  <input type="text"
   id='firstName'
//  value={mood==="create" ? "" : objUser.firstName} 

    placeholder='Enter your First Name '
   className=' w-100 border-1 border-secondary py-2 px-2 rounded-2 bg-light-subtle'
   {...register("firstName" , {required : "This Field is reqiured" , minLength : {
    value : 3 , 
    message : "Min Char is 3"
   }})}
   />

   {errors.firstName? <>
    <div className="alert alert-danger  py-0 mt-1" role="alert">
      {errors.firstName.message}
</div>
   </> : null}
</div>

<div className="col-md-6">
  <label htmlFor="lastName" className=' text-secondary'>Last Name</label>
  <input type="text"
   id='lastName'
    placeholder='Enter your Last Name '
   className=' w-100 border-1 border-secondary py-2 px-2 rounded-2 bg-light-subtle'
   {...register("lastName" , {required : "This Field is reqiured" , minLength : {
    value : 3 , 
    message : "Min Char is 3"
   }})}

  //  value={mood=== "update" ? objUser.lastName :""}
   />

    {errors.lastName? <>
    <div className="alert alert-danger  py-0 mt-1" role="alert">
      {errors.lastName.message}
</div>
   </> : null}
</div>

<div className="col-md-6">
  <label htmlFor="email" className=' text-secondary'>Email</label>
  <input type="email"
   id='email'
    placeholder='Enter your Email '
    // value={mood=== "update" ? objUser.email : ""}

   className=' w-100 border-1 border-secondary py-2 px-2 rounded-2 bg-light-subtle'
   {...register("email" , {required : "This Field is reqiured" , pattern : {
    value : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
    message : "Please enter a valid email address (e.g., name@example.com)"
   }})} />

{errors.email? <>
    <div className="alert alert-danger  py-0 mt-1" role="alert">
      {errors.email.message}
</div>
   </> : null}
</div>

<div className="col-md-6">
  <label htmlFor="age" className=' text-secondary'>Age</label>
  <input type="number"
   id='age'
    placeholder='Enter your Age '
    // value={mood=== "update" ? objUser.age : ""}
   className=' w-100 border-1 border-secondary py-2 px-2 rounded-2 bg-light-subtle' 
   {...register("age" , {required : "This Field is reqiured" , max : {
    value : 60 , 
    message : "Max Age To add user is 60 "
   },
   min : { value : 6 , message : "You must be at least 6 years old"}
  })}
   />
    {errors.age? <>
    <div className="alert alert-danger  py-0 mt-1" role="alert">
      {errors.age.message}
</div>
   </> : null}
</div>

<div className="col-md-6">
  <label htmlFor="phone" className=' text-secondary'>Phone Number</label>
  <input type="tel"
   id='phone'
  //  value={mood=== "update" ? objUser.phone : ""}

    placeholder='Enter your Phone Number '
   className=' w-100 border-1 border-secondary py-2 px-2 rounded-2 bg-light-subtle'
   {...register("phone" , {required : "This Field is reqiured" , pattern : {
    value : /^\+?[0-9]\d{1,14}$/ , 
    message : "Please enter a valid phone number"
   }})}
   />
    {errors.phone? <>
    <div className="alert alert-danger  py-0 mt-1" role="alert">
      {errors.phone.message}
</div>
   </> : null}
</div>

<div className="col-md-6">
  <label htmlFor="birth" className=' text-secondary'>Birth Of Date</label>
  <input type="date"
   id='birth'
    placeholder='Enter your Last Birth Day  '
    // value={mood=== "update" ? objUser.birthDate : ""}
   className=' w-100 border-1 border-secondary py-2 px-2 rounded-2 bg-light-subtle' 
   {...register("birthDate" , {required : "This Field is reqiured" })}
   />
    {errors.birthDate? <>
    <div className="alert alert-danger  py-0 mt-1" role="alert">
      {errors.birthDate.message}
</div>
   </> : null}
</div>

</div>

{
  mood === "create" && <>
  <button className='btn btn-warning w-50 py-2 mt-4 mb-5 text-white position-relative start-50 translate-middle-x' type="submit">{loading ? <>
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

</> : "Add User"}</button>
  </> 
}

{
  mood === "update" && <>
  <button className='btn btn-warning w-50 py-2 mt-4 mb-5 text-white position-relative start-50 translate-middle-x' type="submit">{loading ? <>
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

</> : "save"}</button>
  </> 
}



  </form>



      </div>
    </div>
    </div>
  </>
}
