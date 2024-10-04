import React from 'react'
import Card from 'react-bootstrap/Card';
import mediaplayer from '../assets/media-player.jpg'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {Row,Col} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { BASE_URL } from '../services/baseurl';

function ProjectCard({project}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Card style={{ width: '18rem' }} onClick={handleShow} className='m-3'>
                <Card.Img variant="top" src={`${BASE_URL}/uploads/${project.projectImage}`} height={'200px'} />
                <Card.Body>
                    <Card.Title>{project.title}</Card.Title>
                    <Card.Text>

                    </Card.Text>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>{project.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={6}>
                        <img src={`${BASE_URL}/uploads/${project.projectImage}`} alt="" width={'100%'} height={'75%'} />
                        </Col>
                        <Col md={6}>
                        <h4>Description</h4>
                        <p>{project.overview}</p>
                        <h4>Technologies</h4>
                        <p>{project.language}</p>
                        </Col>
                    </Row>
                </Modal.Body>
                <div className='d-flex fa-2x justify-content-center mb-3'>
                    <Link to={project.github} target='_blank'><i class="fa-brands fa-github"></i></Link>
                    <Link to={project.website} target='_blank'><i class="fa-solid fa-link ms-5"></i></Link>
                </div>
            </Modal>
        </>
    )
}

export default ProjectCard