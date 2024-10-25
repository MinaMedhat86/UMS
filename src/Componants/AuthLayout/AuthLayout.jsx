import React from 'react'

import style from "./AuthLayout.module.css"
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return <>
  <div>
    <Outlet/>
  </div>
  </>
}
