import React from 'react'
import DisBar from '../DisBar/DisBar'

export default function Navbar() {
  return <>

      <nav className="navbar bg-white">
  <div className="container-fluid">
  <DisBar/>
  <form className="d-flex ms-auto align-items-center me-3" role="search">
      <input className="form-control me-2" type="search" placeholder="Search ....." aria-label="Search"/>
      <i className="fa-regular fa-bell text-secondary"></i>
    </form>
  </div>
</nav>

  </>
}
