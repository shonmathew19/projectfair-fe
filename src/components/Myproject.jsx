import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddProject from './AddProject';

import { deleteProjectApi, getUserProjectApi } from '../services/allApi';
import EditProject from './EditProject';
import { addProjectResponseContext, editProjectResponseContext } from '../context/ContextShare';

function Myproject() {
    const [userProject, setUserProject] = useState([]);
    const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext)
    const { editProjectResponse, setEditProjectResponse } = useContext(editProjectResponseContext)

    const getUserProjects = async () => {
        const token = sessionStorage.getItem('token');
        const reqheader = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        const result = await getUserProjectApi(reqheader);
        console.log('user Project= ', result);
        setUserProject(result.data);
    };
    const handleDelete = async (id) => {
      
        const token = sessionStorage.getItem('token')
        const reqHeader={
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        const result = await deleteProjectApi(id,reqHeader)
        console.log('deleted response', result);

        if(result.status === 200){
            alert('Project deleted successfully')
            getUserProjects()
        }else{
            alert('Something went wrong')
        }
        
    }

    useEffect(() => {
        getUserProjects();
    }, [addProjectResponse, editProjectResponse]);

    return (
        <>
            <div className='shadow p-5 mb-5'>
                <div className='d-flex mt-4'>
                    <h5 className='text-info me-auto'>My Projects</h5>
                    <AddProject />
                </div>
                {userProject.length > 0 ? (
                    userProject.map((item) => (
                        <div className='p-3 mt-4 rounded-2 d-flex' style={{ backgroundColor: "lightgray" }}>
                            <h5>{item.title}</h5>
                            <div className='d-flex ms-auto align-items-center'>
                                <EditProject project={item} />
                                <Link className='ms-3 text-success' to={item.website} target='_blank'>
                                    <i className="fa-solid fa-link" style={{ color: 'blue' }}></i>
                                </Link>
                                <Link className='ms-3 text-success' to={item.github} target='_blank'>
                                    <i className="fa-brands fa-github" style={{ color: 'orange' }}></i>
                                </Link>
                                <button className='ms-3 btn' onClick={() => handleDelete(item._id)}>
                                    <i className="fa-solid fa-trash text-danger"></i>
                                </button>

                            </div>
                        </div>
                    ))
                ) : (
                    <p>No projects available.</p>
                )}
            </div>
        </>
    );
}

export default Myproject;
