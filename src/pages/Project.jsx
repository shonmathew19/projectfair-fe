import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { getAllProjectApi } from '../services/allApi'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Project() {


  const [allProject, setAllproject] = useState([])
  const [searchKey, setSearchKey] = useState('')
  const [isToken, setIsToken] = useState(false)
  const navigate = useNavigate()

  const getAllProject = async () => {
    console.log('search key=', searchKey);
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token')
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await getAllProjectApi(reqHeader, searchKey)
      console.log('user project');
      console.log(result);
      setAllproject(result.data)
    }
  }

  useEffect(() => {
    getAllProject()
  }, [searchKey])
  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setIsToken(true)
    }
  })
  return (
    <>
      <>
        <Header />

        <div className='container-fluid'>
          <h3 className='text-center mt-5'>All projects</h3>
        </div>
        <div className='row d-flex justify-content-center my-5'>
          <div className='col-lg-4'>
            <div className="input-group">
              <input type="text" className="form-control" placeholder='Search by technology' onChange={(e) => { setSearchKey(e.target.value) }} />
              <span className="input-group-text">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
            </div>
            <div className='col-md4'></div>
          </div>
        </div>
        {
          isToken ?
            <div className='row my-5'>
              {
                allProject.length > 0 ?
                  allProject.map((item) => (
                    <ProjectCard project={item} />
                  )) :
                  <p>No projects found</p>
              }
            </div> :
                <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: '50vh' }}>
                <p className="text-center display-4 font-weight-bold text-muted">
                  NO projects found
                </p>
                <p>Please<Link to={'/login'} className='ms-2 me-2'>LOGIN</Link>view all projects</p>
                
              </div>
          
        }

      </>

    </>
  )
}

export default Project