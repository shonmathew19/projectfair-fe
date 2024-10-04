import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-success p-3'>
      <div className='container footer d-flex flex-column flex-md-row justify-content-evenly align-items-start'>
        <div className='col-12 col-md-4 mb-3'>
          <h5 className='textStyle'><i className="fa-brands fa-stack-overflow"></i> Project Fair</h5>
          <p className='textStyle' style={{ textAlign: 'justify' }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione et, architecto necessitatibus illum repellat in nemo. Vel facere pariatur ut unde soluta harum placeat dolorum! Maiores provident eum porro quisquam.
          </p>
        </div>
        <div className='col-12 col-md-2 mb-3'>
          <h4 className='textStyle'>Links</h4>
          <Link to='/' className='d-block text-dark' style={{ textDecoration: 'none' }}>
            Home
          </Link>
          <Link to='/dashboard' className='d-block text-dark' style={{ textDecoration: 'none' }}>
            Dashboard
          </Link>
          <Link to='/project' className='d-block text-dark' style={{ textDecoration: 'none' }}>
            Projects
          </Link>
        </div>
        <div className='col-12 col-md-2 mb-3'>
          <h4 className='textStyle'>Guides</h4>
          <Link to='https://react.dev/' target='_blank' className='d-block text-dark' style={{ textDecoration: 'none' }}>
            React
          </Link>
          <Link to='https://react-bootstrap.netlify.app/docs/getting-started/introduction' target='_blank' className='d-block text-dark' style={{ textDecoration: 'none' }}>
            React Bootstrap
          </Link>
          <Link to='https://www.npmjs.com/package/json-server' target='_blank' className='d-block text-dark' style={{ textDecoration: 'none' }}>
            Json Server
          </Link>
        </div>
        <div className='col-12 col-md-3 mb-3'>
          <h4 className='textStyle'>Contact us</h4>
          <div className='d-flex'>
            <input type="text" className='form-control' placeholder='Enter your email id' />
            <button className='btn btn-danger ms-3'>Subscribe</button>
          </div>
          <div className='d-flex justify-content-evenly mt-3'>
            <Link className='text-white' style={{ textDecoration: 'none' }}>
              <i className="fa-brands fa-instagram fa-2x"></i>
            </Link>
            <Link className='text-white' style={{ textDecoration: 'none' }}>
              <i className="fa-brands fa-facebook fa-2x"></i>
            </Link>
            <Link className='text-white' style={{ textDecoration: 'none' }}>
              <i className="fa-brands fa-twitter fa-2x"></i>
            </Link>
            <Link className='text-white' style={{ textDecoration: 'none' }}>
              <i className="fa-brands fa-reddit fa-2x"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
