import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()
  const handleLogout = () => {
    if (sessionStorage.getItem('token')) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('loggedUser')
      navigate('/')
    }
  }

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container >
          <Link to={'/'} style={{ textDecoration: "none" }}>
            <Navbar.Brand>
              <img
                alt=""
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/800px-Stack_Overflow_icon.svg.png"
                width="40"
                height="40"
                className="d-inline-block align-top"
              />
              Project Fair
            </Navbar.Brand>
          </Link>
          <button className='btn btn-warning' onClick={handleLogout}><i class="fa-solid fa-power-off"></i> Logout</button>
        </Container>
      </Navbar>
    </>
  )
}

export default Header