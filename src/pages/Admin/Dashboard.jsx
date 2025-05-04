/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import { UserContext } from '../../context/userContext';
import DashboardLayout from '../../components/layout/DashboardLayout';

const Dashboard = () => {
  useUserAuth();


  const {user} = useContext(UserContext)

  return (
    <DashboardLayout>Dashboard</DashboardLayout>
  )
}

export default Dashboard