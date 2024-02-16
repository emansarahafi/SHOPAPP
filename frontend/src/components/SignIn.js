import React, { useState } from "react"; 
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
  } from "mdb-react-ui-kit";
  import "../App.css";
  import { Link } from "react-router-dom"; // Import Link from react-router-dom 
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
  function SignIn() {
    const url = "http://localhost:8022/api/signIn"; 
    const navigate=useNavigate()
    const [user, setUser] = useState({ email: "", password: "" });
    const handleChange = (e) => {
        setUser({ ...user, [e.target.id]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(url, user)
            .then((response) => {
                console.log(response.data);
                const token = response.data.token; localStorage.setItem("token", token);
                if(response.data.user.role==='user'){navigate('/profile');} 
                else{navigate('/customers')}
            })
            .catch((error) => {
            console.error("There was an error!", error); });
            };

    return (
        <div style={{ height: '100vh', width: '100vw', backgroundImage:"url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",backgroundSize: 'cover', backgroundPosition: 'center center' }}>
            <MDBContainer
            fluid
            className="d-flex align-items-center justify-content-center bg-image" >
                <div className="mask gradient-custom-3"></div> <div style={{ marginTop: "60px" }}>
                    <MDBCard className="m-5" style={{ maxWidth: "600px" }}> <MDBCardBody className="px-5" >
                        <h2 className="text-uppercase text-center mb-5">Sign In to your account</h2> <form onSubmit={handleSubmit}>
                        <MDBInput wrapperClass="mb-4" size="lg" placeholder="Enter email" onChange={handleChange} id="email"
                        />
                        <MDBInput
                        wrapperClass="mb-4" size="lg"
                        type="password" placeholder="Enter password" onChange={handleChange} id="password"
                        />
                        <MDBBtn className="mb-4 w-100 gradient-custom-4" size="lg" type="submit">
                        SignIn
                        </MDBBtn>
                        <div className="text-center">
                        <p className="mb-0">Forgot your password? <Link
                        to="/signIn">reset password</Link></p> </div>
                        </form>
                        </MDBCardBody>
                    </MDBCard>
                    </div>
            </MDBContainer>
        </div> 
    );
}
export default SignIn;