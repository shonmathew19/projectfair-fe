import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { getHomeProject } from '../services/allApi'

function Home() {
  const [isLogin, setIsLogin] = useState(false)
  const [homeProject, setHomeProject] = useState([])

  const getHomeProjectItems = async () => {
    const result = await getHomeProject();
    console.log('Home projects');
    console.log(result);
    setHomeProject(result.data)


  }
  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setIsLogin(true)
    }
    getHomeProjectItems();
  }, [])

  return (
    <>
      <div className='container-fluid bg-info p-4 mb-4' style={{ width: "100%", height: '50%' }}>
        <Row>
          <Col xs={12} md={6} lg={4} xl={3} className='d-flex justify-content-center align-items-center flex-column'>
            <div className='ms-5'>
              <h2 className='text-light'>Project Fair</h2>
              <h5>One stop destination for many software projects</h5>
              {
                isLogin ?
                  <Link to={'/dashboard'} >
                    <button className='btn btn-outline-light mt-3'>MANAGE PROJECT <i class="fa-solid fa-arrow-right"></i></button>
                  </Link> :
                  <Link to={'/login'} >
                    <button className='btn btn-outline-light mt-3'>GET STARTED <i class="fa-solid fa-arrow-right"></i></button>
                  </Link>
              }

            </div>

          </Col>
          <Col xs={12} md={6} lg={8} xl={9} className='d-flex justify-content-center align-items-center flex-column'  >
            <img className=' mt-3 mb-3' src="https://projectsly.com/images/blog/best-project-design.png?v=1686553999071005322" alt="" style={{ width: '60%' }} />
          </Col>
        </Row>
      </div>
      <div className='container-fluid'>
        <h2 className='text-center my-5'>Explore our Projects</h2>
        <marquee scrollAmount={20}>
          <div className='row'>
            {
              homeProject?.length > 0 ?
                homeProject.map((item) => (
                  <div className='col-md-4 d-flex justify-content-center p-4'>
                    <ProjectCard project={item}/>
                  </div>
                )) :
                <p>No items found</p>
            }

            {/* <div className='col-md-4 d-flex justify-content-center p-4'>
              <ProjectCard />
            </div>
            <div className='col-md-4 d-flex justify-content-center p-4'>
              <ProjectCard />
            </div> */}

          </div>
        </marquee>
        <Link to={'/project'} className='text-info' style={{ textDecoration: 'none' }}>
          <h5 className='text-center'>See more projects</h5>
        </Link>

      </div>
    </>
  )
}

export default Home