import React from "react";
import Container from "react-bootstrap/Container"; 
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar"; 
import { Link, NavLink } from "react-router-dom"; 
import { UserRole } from "./UserRole";
import { useNavigate } from "react-router-dom";

export default function NavigationBar() { 
  const linkStyle = {
    textDecoration: "none", 
    fontSize: "20px",
    color: "white",
    borderRight: "1px solid white", 
    padding: "15px",
    marginLeft: "100px",
  };
  const role = UserRole(); 
  const navigate=useNavigate() 
  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to SignOut")){ 
      localStorage.removeItem("token"); // Remove the token from local storage 
      navigate("/"); // Navigate to the home page or login page
    } 
  };
  

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Nav>
            <Nav.Link>
              <Link to="/register" style={{ ...linkStyle, marginLeft: "100px" }}> 
                {" "}
                Home{" "}
              </Link>
            </Nav.Link>

            <Nav.Link>
              <Link to="/about" style={linkStyle}> 
                {" "}
                About{" "}
              </Link>
            </Nav.Link>

            <Nav.Link>
              <NavLink
                to="/products"
                style={({ isActive }) => {
                  return {
                    ...linkStyle,
                    fontWeight: isActive ? "bold" : "", 
                    FontSize: isActive ? "25px" : "20px",
                  }; 
                }}
              >
              Products
            </NavLink>
          </Nav.Link>

          {role === 'admin' && (
          <Nav.Link>
              <NavLink
                to="/customers"
                style={({ isActive }) => {
                  return {
                    ...linkStyle,
                    fontWeight: isActive ? "bold" : "", 
                    FontSize: isActive ? "25px" : "20px",
                  }; 
                }}
              >
              Customers
            </NavLink>
          </Nav.Link>
          )}

          {role === 'user' && (
          <Nav.Link>
              <NavLink
                to="/profile"
                style={({ isActive }) => {
                  return {
                    ...linkStyle,
                    fontWeight: isActive ? "bold" : "", 
                    FontSize: isActive ? "25px" : "20px",
                  }; 
                }}
              >
              Profile
            </NavLink>
          </Nav.Link>
          )}

          <Nav.Link>
            {role ? (
          <Link to="/"
          onClick={handleSignOut} 
          style={{
          ...linkStyle,
          borderRight: "none",
          border: "3px solid grey",
          borderRadius: "10px",
          marginLeft: "190px",
          padding: "8px",
          }} 
        >
          Sign Out
        </Link> 
        ):(
          <Link
            to="/signUp"
            style={{
              ...linkStyle,
              borderRight: "none",
              border: "3px solid grey",
              borderRadius: "10px",
              marginLeft: "190px",
              padding: "8px",
            }}>
            Sign Up/In
          </Link> 
          )}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar> 
  );
}