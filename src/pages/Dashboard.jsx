import React from 'react'
import Header from '../components/Header'
import Myproject from '../components/Myproject'
import Profile from '../components/Profile'

function Dashboard() {
  const userData = JSON.parse(sessionStorage.getItem('loggedUser'));
  console.log('logged user data', userData.username);
  
  return (
    <>
      <Header />
      <div className='container-fluid'>
        <h4 className='ms-4 mt-5'>Welcome
          <span className='text-warning ms-2'>{userData?.username}</span>
        </h4>
        <div className='row'>
          <div className='col-md-8'>
            <Myproject />
          </div>
          <div className='col-md-4'>
            <Profile />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard