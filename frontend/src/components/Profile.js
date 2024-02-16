import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Ensure correct import
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../Profile.css'; // Assuming you have a separate CSS file for styles 
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function Profile() {
    const url = "http://localhost:8022/api/users";
    const [user, setUser] = useState({});
    const [userId, setUserId] = useState(null); // Use state for userId 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [userUpdate, setUpdate] = useState({
            userName: "",
            email: "",
            age: "", 
    });
    const reload = () => window.location.reload();
    useEffect(() => {
        const token = localStorage.getItem("token"); 
        console.log(token)
        if (token) {
            try {
                const decodedToken = jwtDecode(token); 
                setUserId(decodedToken.id); // Set userId in state
            } catch (error) {
                console.error("Token decoding error:", error);
            } 
        }
        if (userId) {
            const headers = {
                'Authorization': `Bearer ${token}` 
            };
            axios.get(`${url}/${userId}`,{ headers }) 
            .then((res) => {
                setUser(res.data.user);
            })
            .catch((error) => {
                console.error(error.response.data.msg); 
            });
        }
    }, [userId]);

    const handleChange = (e) => {
        setUpdate({ ...userUpdate, [e.target.id]: e.target.value }); 
    };
    const handleUpdate=async(e)=>{ 
        e.preventDefault();
        try {
            await axios.put(`${url}/${user._id}`, userUpdate); 
        } catch (error) {
            console.log(error);
        }
        handleClose();
        reload();
    };

    return ( <>
    <div className="profile-container"> {/* Use a class for styling */} <h3 className="welcome-back">Welcome Back</h3>
    <Card className="profile-card">
    <Card.Body>
    <div className="user-detail">
                    <h6>UserName:</h6>
    <Card.Text>{user.userName}</Card.Text> </div>
    <div className="user-detail"> <h6>Email:</h6>
    <Card.Text>{user.email}</Card.Text> </div>
    <div className="user-detail"> <h6>Age:</h6>
    <Card.Text>{user.age}</Card.Text> </div>
    <div className="update-button"> <Button variant="success"
    onClick={handleShow}>Update</Button> </div>
            </Card.Body>
        </Card>
    </div>
    <Modal show={show} onHide={handleClose}> <Modal.Header closeButton>
    <Modal.Title>Update Information</Modal.Title> </Modal.Header>
    <Modal.Body>
    {/* /////////// */}
    <Form onSubmit={handleUpdate}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Username</Form.Label> <Form.Control
    type="text" placeholder={user.userName} onChange={handleChange} id="userName"
    />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label> <Form.Control
    type="email" placeholder={user.email} onChange={handleChange} id="email"
    />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>age</Form.Label>
    <Form.Control type="text" placeholder={user.age} onChange={handleChange} id="age"
                />
                </Form.Group>
    <Button variant="primary" type="submit"> Submit
                </Button>
            </Form>
            {/* ////////////// */}
            </Modal.Body>
    </Modal> 
    </>
    ); 
}
export default Profile;