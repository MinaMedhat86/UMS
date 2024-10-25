import React, { useContext, useEffect, useState } from 'react'
import style from "./UserList.module.css"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Circles } from 'react-loader-spinner'

import falseIcon from "../../Assets/img/falseIcon.png"
import { LoginContext } from '../../Context/LoginContext';


export default function UserList() {

  let {setObjUser , setMood} = useContext(LoginContext);

let navigate = useNavigate()
function toAddUser(){
  setMood("create")
navigate("/dashboard/adduser")
}

    let [users , setUsers] = useState([]);
    let [userId , setUserId]= useState(null)
    let [firstName , setFirstName] = useState("");
    let [lastName , setLastName] = useState("");
    let [loading , setLoading] = useState(true)

    function handleuser (id , firstname , lastname ){
       setUserId(id)
       setFirstName(firstname)
       setLastName(lastname)
      console.log(id);
      
    }
    function moodUpdate(obj){
setMood("update");
setObjUser(obj)
navigate("/dashboard/addUser");
    }

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 11;


    // User API
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


    // Delete API

   async function deleteUser(){
try {
  let response = await axios.delete(`https://dummyjson.com/users/${userId}`);
  toast.success("Deleted Succesfully")
  console.log(response);
  
  
} catch (error) {
  console.log(error);
  toast.error("Something Happened")

  
}
    }

//Pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
      const paginate = (pageNumber) => setCurrentPage(pageNumber);
      const totalPages = Math.ceil(users.length / usersPerPage);

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

</> : <>
<div className=' container-fluid py-4'>
    <div className=' d-flex justify-content-between '>
        <h2  className=' fw-semibold ms-3' > User List</h2>
        <button className=' btn btn-warning text-white px-5 py-1 me-3' onClick={()=>{toAddUser()}}>Add New User</button>
    </div>
    <hr className=' mt-3 mx-4'/>

    <table className="table align-middle table-hover">
  <thead >
    <tr >
      <th scope="col" className={`${style.trStyle}`}></th>
      <th scope="col" className={`${style.trStyle}`}>Named</th>
      <th scope="col" className={`${style.trStyle}`}>Email</th>
      <th scope="col" className={`${style.trStyle}`}>Phone</th>
      <th scope="col" className={`${style.trStyle}`}>Enroll Number</th>
      <th scope="col" className={`${style.trStyle}`}>Date of admission</th>
      <th scope='col' className={`${style.trStyle}`}></th>


    </tr>
  </thead>
  <tbody>
{
    currentUsers.map((item)=>{
return <>
    <tr key={item.id} >
      <th  >
        <img src={item.image} alt={item.gender} className='w-25'/>
      </th>
      <td className=''>{item.firstName} {item.lastName}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>{item.bank.cardNumber}</td>
      <td>{item.birthDate}</td>
      <td>
      <i 
      className=" text-warning fs-5 fa-solid fa-pen me-4 cursor-pointer"
      onClick={()=>{moodUpdate(item)}}
      ></i>
      <i 
      className="fa-solid fa-trash text-danger fs-5 cursor-pointer"
       data-bs-toggle="modal" data-bs-target="#exampleModal" 
       onClick={()=>{handleuser(item.id , item.firstName , item.lastName)}}></i>
      </td>
    </tr>



</>
    })
}
  </tbody>
</table>

<nav className=' d-flex justify-content-center my-3'>
        <ul className="pagination">
          {[...Array(totalPages).keys()].map((number) => (
            <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''} `}>
              <button className={`page-link  px-4 py-1 ${style.btnStyle} `} onClick={() => paginate(number + 1)}>
                {number + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>


      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-body d-flex flex-column">
        <img src={falseIcon} className='w-50 mx-auto mt-3' alt='falseIcon' />
        <h2 className='mt-3 text-center fw-semibold'>Are You Sure ?</h2>
        <p className=' text-secondary text-center fs-5 lh-sm '>Are you sure that you want to Delete {firstName} {lastName}? This operation will not make you be able to see his data again. </p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger px-4" data-bs-dismiss="modal" onClick={()=>{deleteUser()}}>Delete</button>
        <button type="button" className="btn btn-secondary px-4" data-bs-dismiss="modal">Cancel</button>
      </div>
    </div>
  </div>
</div>

</div></>}

  <ToastContainer/>

  </>
}



