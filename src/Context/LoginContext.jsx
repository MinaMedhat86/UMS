import { createContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';


export let LoginContext = createContext({})



export default function LoginContextProvider (props){


  let [decodedData , setDecodedData ] = useState(null)
function getUserData(){
  const decodedToken = jwtDecode(localStorage.getItem("userToken"));
  setDecodedData(decodedToken)
}

useEffect(()=>{
  if(localStorage.getItem("userToken")){
    getUserData()
  }
} , [])  


let [mood , setMood] = useState("create")

let [objUser , setObjUser] = useState(null)



    return <>
    <LoginContext.Provider value={{ getUserData , decodedData , mood , setMood , setObjUser , objUser}}>
        {props.children}
    </LoginContext.Provider>
    
    </>
}