import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { useNavigate } from "react-router-dom";
import Show from "./Show";

export default function CardItem({
  elt,
  details,
  handleIncrement,
  handleDecrement,
  handleDelete,
  handleSumIncrement,
  handleSumDecrement,
  handleSumDelete,
}) {
  const increment = () => {
    handleIncrement(elt.id);
    handleSumIncrement(elt.price);
  };
  const decrement = () => {
    handleDecrement(elt.id);
    handleSumDecrement(elt);
  };

  const deleteProduct = () => {
    handleDelete(elt.id);
    handleSumDelete(elt);
  };

  const showDetails = () => {
    navigate(`/products/${elt.id}`)
  };

  const navigate = useNavigate();
  
  const stars=[...Array(5)].map((item,i)=>{
    return(
      <span style={{color:elt.rating > i ? "gold":"grey", fontSize:"20px"}}>★</span>
    )
  });

  return (
    <Card style={{ width: "18rem", marginTop: "60px" }}>
      <Card.Img variant="top" src={elt.image} style={{ maxHeight: "200px" }} />
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <Card.Title> {elt.name} </Card.Title>
          {details && <Card.Title> {elt.brand} </Card.Title>}
          <Card.Text>{elt.price} $</Card.Text>{" "}
        </div>
        <span>{stars}</span>
        {details&&<Show content={elt.description} maxLength={30}></Show>}
        {!details&&<>
          <div style={{ display: "flex", gap: "10px" }}>
          <Button variant="success" onClick={increment}>
            +
          </Button>
          <span>{elt.qte}</span>
          <Button variant="primary" onClick={decrement}>
            -
          </Button>
        </div>

        <Button variant="danger" onClick={deleteProduct}>
          Delete
        </Button>

        <Button variant="light" style={{border:"1px solid black"}} onClick={showDetails}>
          More details <Badge bg="secondary">i</Badge>
        </Button>
        </>}
      </Card.Body>
    </Card>
  );
}


