import React from "react";
import "./Product.css";
import { useAuth } from "./useAuthClient"; // Assuming you might need authentication for adding to basket
// import { backend_canister } from 'declarations/backend_canister';


// Assuming you have defined getAuthenticatedUserPrincipal function here

const Product = ({ id, title, image, price, rating }) => {
  const { isAuthenticated , principal } = useAuth(); // Assuming you might need authentication for adding to basket

  const handleAddToBasket = async () => {
    // Handle adding the product to basket
    if (isAuthenticated) {
      try {

        console.log("User Principal:", principal);
        // Implement the logic for adding to basket
      } catch (error) {
        console.error("Error while getting user principal:", error);
      }
    } else {
      // Redirect or show a message to log in
      console.log("Please log in to add products to basket.");
      
    }
  };

//   console.log(typeof title);
//   console.log(typeof price);
//   console.log(typeof image);
  



  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>🌟</p>
            ))}
        </div>
      </div>

      <img src={image} alt={title} />

      <button onClick={handleAddToBasket}>Add to Basket</button>
    </div>
  );
};

export default Product;
