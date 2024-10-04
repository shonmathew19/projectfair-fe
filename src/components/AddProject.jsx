import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { addProjectApi } from '../services/allApi';
import { addProjectResponseContext } from '../context/ContextShare';

function AddProject() {
    const [show, setShow] = useState(false);
    const [token, setToken] = useState("")
    //useContext() hook is used to access state created inside contentShare
    const {addProjectResponse, setAddProjectResponse} = useContext(addProjectResponseContext);
    
    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'))
        }
    },[])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [projectDetails, setProjectDetails] = useState({
        title: "",
        language: "",
        github: "",
        overview: "",
        website: "",
        projectImage: ""
    })
    const [preview, setPreview] = useState('')
    useEffect(() => {
        console.log('project details');
        console.log(projectDetails);

        if (projectDetails.projectImage) {
            setPreview(URL.createObjectURL(projectDetails.projectImage))
        }

    }, [projectDetails.projectImage])

    const handleAddProject = async (e) => {
        e.preventDefault();
        const { title, language, github, website, overview, projectImage } = projectDetails
        if (!title || !language || !github || !website || !overview || !projectImage) {
            toast.warning('Please fill the form completely')
        } else {
            //here we are also uploading a file.So we should send body in the form of FormData
            const reqBody = new FormData();
            reqBody.append('title', title)
            reqBody.append('language', language)
            reqBody.append('github', github)
            reqBody.append('website', website)
            reqBody.append('overview', overview)
            reqBody.append('projectImage', projectImage)

            //here content type we are passing is multipart FormData, so specific req header is needed.
            const reqHeader = {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
            const result = await addProjectApi(reqBody, reqHeader)
            if (result.status === 200) {
                setAddProjectResponse(result.data)
                alert(`${title} is uploaded successfully`)
                setProjectDetails({
                    title: "",
                    language: "",
                    github: "",
                    overview: "",
                    website: "",
                    projectImage: ""
                })
                setPreview("")
                handleClose()
                
            } else if (result.status === 409) {
                alert(`${title} already exists`)
            }
            else {
                alert(`${title} uploading failed`)
            }
        }
    }
    const handleClose1 = ()=>{
        setPreview("")
        handleClose()
        setProjectDetails({
            title: "",
            language: "",
            github: "",
            overview: "",
            website: "",
            projectImage: ""
        })
    }


    return (
        <>
            <button className='btn btn-success' onClick={handleShow}>ADD PROJECT</button>
            <Modal show={show} onHide={handleClose} size={'lg'}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-success'>ADD PROJECT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-md-6'>
                            <label htmlFor="projectImg">
                                <input type="file" style={{ display: 'none' }} id='projectImg'
                                    onChange={(e) => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })}
                                />
                                <img className='w-100' src={preview ? preview : "https://cdn-icons-png.flaticon.com/256/2716/2716054.png"} alt="" />
                            </label>
                        </div>
                        <div className='col-md-6'>

                            <input type="text" placeholder='Project title' className='form-control mb-3'
                                value={projectDetails.title}
                                onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
                            <input type="text" placeholder='Languages used' className='form-control mb-3'
                                value={projectDetails.language}
                                onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} />
                            <input type="text" placeholder='GitHub link' className='form-control mb-3'
                                value={projectDetails.github}
                                onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} />
                            <input type="text" placeholder='Website link' className='form-control mb-3'
                                value={projectDetails.website}
                                onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} />
                            <textarea className='form-control mb-3' placeholder='Project overview' rows={'4'}
                                value={projectDetails.overview}
                                onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })}></textarea>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose1}>
                        CANCEL
                    </Button>
                    <Button variant="success" onClick={handleAddProject}>
                        ADD
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddProject