import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Product from "../utils/Product";
import { backend_canister } from '../../../../declarations/backend_canister';

const Dashboard = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            backend_canister.getAllProducts().then((response) => {
                console.log(response);
                setProducts(response);
            });
        };

        fetchProducts();
    }, []);

    return (
        <div className="home">
            <div className="home__container">
                {products.map(product => {
                    // Convert id, price, and rating to string
                    
                    const idString = String(product[1].id);
                    const priceString = String(product[1].Price);
                    const ratingString = String(product[1].Rating);

                    console.log(idString);
                    console.log(ratingString);
                    console.log("**")

                    const idWithoutLastChar = parseInt(idString);
                    const priceWithoutLastChar = parseInt(priceString);
                    const ratingWithoutLastChar = parseInt(ratingString);

                    console.log(idWithoutLastChar);
                    console.log(priceWithoutLastChar);
                    console.log(ratingWithoutLastChar);
                    return (
                        <Product
                            key={product[1].id} // Ensure each product has a unique key
                            id={idWithoutLastChar}
                            title={product[1].Title}
                            price={priceWithoutLastChar}
                            rating={ratingWithoutLastChar}
                            image={product[1].Image}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Dashboard;
