import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from "./Componants/Login/Login";
import Layout from "./Componants/Layout/Layout";
import Notfound from "./Componants/Notfound/Notfound"
import Home from "./Componants/Home/Home"

import AuthLayout from "./Componants/AuthLayout/AuthLayout";
import AddUser from "./Componants/AddUser/AddUser";
import Profile from "./Componants/Profile/Profile";
import UserList from "./Componants/UserList/UserList";
import ProtectedRoute from "./Componants/ProtectedRoute/ProtectedRoute";



function App() {



  let routers = createBrowserRouter([
{path : "" , element :<AuthLayout/>, children : [
  {index : true , element : <Login/>},
  {path : "*" , element: <ProtectedRoute><Notfound/></ProtectedRoute> }
]}, 
{path : "dashboard" , element :  <Layout/> , children:[
  {index:true , element : <ProtectedRoute><Home/> </ProtectedRoute>},
  {path : "userlist" , element : <ProtectedRoute><UserList/> </ProtectedRoute>},
  {path : "addUser" , element: <ProtectedRoute> <AddUser/></ProtectedRoute>},
  {path : "profile" , element : <ProtectedRoute><Profile/> </ProtectedRoute>},
  {path : "*" , element : <ProtectedRoute><Notfound/> </ProtectedRoute>}

] }
  ])

  return <>

  <RouterProvider router={routers}>
    
  </RouterProvider>

  </>

}

export default App;
