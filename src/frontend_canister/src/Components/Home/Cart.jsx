import React, { useEffect, useState } from 'react';
import { useAuth } from "../utils/useAuthClient";
import { backend_canister } from '../../../../declarations/backend_canister';
import './Cart.css';

function CartPage() {
    const { principal } = useAuth();
    const userPrincipal = principal;
    console.log(principal)
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    async function onButtonPress(el) {
        el.target.disabled = true;
        console.log("buttom press");
        const hasAllowed = await window.ic?.plug?.requestConnect();
      
        if (hasAllowed) {
          el.target.textContent = "Plug wallet is connected"
      
          const balance = await window.ic?.plug?.requestBalance();
      
          if (balance >= total) {
            el.target.textContent = "Plug wallet has enough balance"
      
            const requestTransferArg = {
              to: 'oxdrp-7ysgo-g2uoe-4na4o-2lqie-zmrwm-64ogo-l7v4a-ycick-3255i-tqe',
              amount: total,
            };
            const transfer = await window.ic?.plug?.requestTransfer(requestTransferArg);
      
            const transferStatus = transfer?.transactions?.transactions[0]?.status;
      
            if (transferStatus === 'COMPLETED') {
              el.target.textContent = `Plug wallet transferred ${coffeeAmount} e8s`;
            } else if (transferStatus === 'PENDING') {
              el.target.textContent = "Plug wallet is pending.";
            } else {
              el.target.textContent = "Plug wallet failed to transfer";
            }
          } else {
            el.target.textContent = "Plug wallet doesn't have enough balance";
          }
        } else {
          el.target.textContent = "Plug wallet connection was refused";
        }
      
        setTimeout(() => {
          el.target.disabled = false;
          el.target.textContent = "Buy me a coffee"
        }, 5000);
      }

    useEffect(() => {
        backend_canister.showCart(userPrincipal)
            .then(products => {

                setCart(products[0]);

                let totalSum = products[0].reduce((sum, product) => sum + parseInt(String(product.Price)), 0);
                setTotal(totalSum);

                console.log('products', products);
            })
            .catch(error => console.error(error));
        console.log('cart: ', cart);
        // console.log(cart[1]);

    }, [userPrincipal]);

    return (
        <div className="cart">
            <h1 className="cart__title">Your Cart</h1>
            {cart.map((product, index) => (

                <div className="cart__item" key={index}>
                    <h2 className="cart__itemTitle">{product.Title}</h2>
                    <p className="cart__itemPrice">Price: {parseInt(product.Price)}</p>
                    <p className="cart__itemRating">Rating: {parseInt(product.Rating)}</p>
                    <img className="cart__itemImage" src={product.Image} alt={product.Title} />
                </div>
            ))}
            <h2 className="cart__total">Total: {total}</h2>
            <div id="app">
      <button onClick={onButtonPress}  id="buy-me-coffee">Pay Now</button>
    </div>
        </div>
    );
}

export default CartPage;
