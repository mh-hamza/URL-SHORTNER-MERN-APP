import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'


function Home() {
  const { user } = useAuth()


  
  if (!user) {
    return <div>Loading...</div> 
  }

  return (
    <div>
      <h1>Home, {user.name}</h1>
      <div>
        {user.email}
        <h1>Hello i am {user.name}</h1>
      </div>
      <h3><Link to="/dashboard">Dashboard</Link></h3>
    </div>
  )
}

export default Home
