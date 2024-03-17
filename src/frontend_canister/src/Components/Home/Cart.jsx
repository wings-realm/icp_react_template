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
        console.log("button press");
        const hasAllowed = await window.ic?.plug?.requestConnect();

        if (hasAllowed) {
            window.alert("Your Plug wallet is connected");

            const balance = await window.ic?.plug?.requestBalance();

            if (balance >= total) {
                window.alert("Your Plug wallet has enough balance");

                const requestTransferArg = {
                    to: 'oxdrp-7ysgo-g2uoe-4na4o-2lqie-zmrwm-64ogo-l7v4a-ycick-3255i-tqe',
                    amount: total,
                };
                const transfer = await window.ic?.plug?.requestTransfer(requestTransferArg);

                const transferStatus = transfer?.transactions?.transactions[0]?.status;

                if (transferStatus === 'COMPLETED') {
                    window.alert(`Plug wallet transferred ${coffeeAmount} e8s`);
                } else if (transferStatus === 'PENDING') {
                    window.alert("Plug wallet is pending.");
                } else {
                    window.alert("Plug wallet failed to transfer");
                }
            } else {
                window.alert("Plug wallet doesn't have enough balance");
            }
        } else {
            window.alert("Plug wallet connection was refused");
        }

        setTimeout(() => {
            el.target.disabled = false;
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
            <div className="cart__items">
                <h1 className="cart__title">Your Cart</h1>
                {cart.map((product, index) => (
                    <div className="cart__item" key={index}>
                        <img className="cart__itemImage" src={product.Image} alt={product.Title} />
                        <div className="cart__itemDetails">
                            <h2 className="cart__itemTitle">{product.Title}</h2>
                            <p className="cart__itemPrice">Price: ICP {parseInt(product.Price)}</p>
                            <p className="cart__itemRating">Rating: {parseInt(product.Rating)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart__summary">
                <h2 className="cart__total">Total: ICP {total}</h2>
                <button onClick={onButtonPress} id="buy-me-coffee" className="cart__payButton">Pay Now</button>
            </div>
        </div>
    );
}

export default CartPage;
