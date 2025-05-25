import React from 'react'
import { Outlet } from 'react-router-dom'
//{allowedRoles}
const PrivateRoute = () => {
  return (
    <Outlet/>
  )
}

export default PrivateRoute