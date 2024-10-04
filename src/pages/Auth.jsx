import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { loginApi, registerApi } from '../services/allApi'
import { toast } from 'react-toastify';


function Auth({ register }) {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      toast.warning('Please fill the form completely')
    } else {
      const result = await registerApi(userData)
      if (result.status === 201) {
        setUserData({
          username: '',
          email: '',
          password: ''
        })

        toast.success(`${username} successfully registered`)
        navigate('/login')

      } else if (result.status === 400) {
        console.log('-----------------------', result);

        toast.warning(result.response.data)
      }
      else {
        toast.error('Something happened')
      }
      console.log(result);
    }
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    if (!email || !password) {
      toast.warning('Please fill the form completely')
    } else {
      console.log('===login result====');
      const result = await loginApi(userData)
      console.log(result);
      if (result.status === 200) {
        sessionStorage.setItem('loggedUser', JSON.stringify(result.data.data))
        sessionStorage.setItem('token', result.data.token)
        setUserData({
          username: '',
          email: '',
          password: ''
        })
        toast.success(`${email} logged in successfully`)
        navigate('/')
      } else if (result.status === 401) {
        toast.warning('Invalid email or password')
      } else {
        toast.error('Something went wrong')
      }
    }
  }

  const registerForm = register ? true : false;
  return (
    <>
      <div style={{ width: "100%", height: "80vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className='container w-75'>
          <h5>
            <Link to={'/'} style={{ textDecoration: 'none', fontWeight: 'bolder' }}>
              <i class="fa-solid fa-arrow-left me-2">
              </i>BACK TO HOME</Link>
          </h5>
          <div style={{ backgroundColor: "lightcyan" }} className='rounded-5 mt-5'>
            <Row>
              <Col md={6} className='p-4 d-flex justify-content-center align-items-center'>
                <img src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg" alt="" width={'70%'} />
              </Col>
              <Col md={6} className='p-5 d-flex justify-content-center'>
                <form className='w-100'>
                  <h5 className='text-center'> <i class="fa-brands fa-stack-overflow me-2 "></i>Project Fair</h5>
                  {
                    registerForm ?
                      <>
                        <h6 className='text-center mb-3 mt-3'>Sign Up to your account</h6>
                        <input type="text" placeholder='Name' className='form-control'
                          value={userData.username}
                          onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
                      </>
                      :
                      <h6 className='text-center mb-3 mt-3'>
                        Sign in to your account
                      </h6>
                  }
                  <div className='mb-3 mt-3'>
                    <input className='form-control' type="text" placeholder='Enter email id'
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                  </div>
                  <div className='mb-3 mt-3'>
                    <input className='form-control' type="text" placeholder='Enter email password'
                      value={userData.password}
                      onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                  </div>
                  {
                    registerForm ?
                      <div>
                        <button className='btn btn-warning w-100 rounded'
                          onClick={handleRegister}>
                          REGISTER</button>
                        <p className='mt-3 text-center'>Already a user? Click here to <Link className='ms-1' to={'/login'}>Login</Link></p>
                      </div>
                      :
                      <div>
                        <button className='btn btn-warning w-100 rounded' onClick={handleLogin}>LOGIN</button>
                        <p className='mt-3 text-center'>Not a registered? Click here to <Link className='ms-1' to={'/register'}>Register</Link></p>
                      </div>
                  }
                </form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Auth