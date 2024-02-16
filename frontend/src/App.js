import "bootstrap/dist/css/bootstrap.min.css";
import { products } from "./components/Data";
import { useState } from "react";
import ListOfProducts from "./components/ListOfProducts";
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Customers from "./components/Customers";
import ProductDetails from "./components/ProductDetails";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [product, setProduct] = useState(products);
  const [sum, setSum] = useState(0);

  const handleIncrement = (id) => {
    setProduct(
      product.map((elt) => {
        if (elt.id === id) {
          return { ...elt, qte: elt.qte + 1 };
        }
        return elt;
      })
    );
  };

  const handleDecrement = (id) => {
    setProduct(
      product.map((elt) => {
        if (elt.id === id && elt.qte > 0) {
          return { ...elt, qte: elt.qte - 1 };
        }
        return elt;
      })
    );
  };

  const handleDelete = (id) => {
    setProduct(product.filter((elt) => elt.id !== id));
  };

  // we can include setSum(sum+elt.price) to the const handleIncrement = (elt) => {...}  but The separation in 2 functions
  //can help in understanding the logic better and is in line with the Single Responsibility Principle (one function doing one thing).

  const handleSumIncrement = (price) => {
    setSum(sum + price);
  };
  const handleSumDecrement = (article) => {
    if (article.qte > 0) {
      setSum(sum - article.price);
    }
  };

  const handleSumDelete = (article) => {
    setSum(sum - article.price * article.qte);
  };

  return (
    <div style={{backgroundImage:'url("https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-7130560.jpg&fm=jpg")', backgroundSize:"cover", minHeight:"100vh"}}>
      <BrowserRouter>
        <NavigationBar/>
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/products" element={<ListOfProducts
            product={product}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            handleDelete={handleDelete}
            handleSumDecrement={handleSumDecrement}
            handleSumIncrement={handleSumIncrement}
            sum={sum}
            handleSumDelete={handleSumDelete}
            />}/>
          <Route path="/customers" element={<Customers/>}/>
          <Route path="/products/:id" element={<ProductDetails product={product}/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route 
            path="/customers" 
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <Customers/>
              </PrivateRoute>
            }
          />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute allowedRoles={['user']}>
                <Profile/>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

