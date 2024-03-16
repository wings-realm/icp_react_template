import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/useAuthClient";
import { useTranslation } from "react-i18next";
import toast, { Toaster } from "react-hot-toast";
import Logo from '../../../assets/icpLogo2.png';
import "./Navbar.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";


const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    // Function to handle login
    const handleLogout = async () => {
        setIsLoading(true);
        await logout().then(() => {
            window.location.reload();
        }).catch(() => {
            toast.error(t("dashboard.errorText"));
        });
    };

    return (
        <div className="header">
            <img
                className="header__logo"
                src={Logo}
                alt="Logo"
            />
            <div className="header__search">
                <input className="header__searchInput" type="text" />
                <SearchIcon className="header__searchIcon" />
            </div>
            <div className="header__nav">
                {isAuthenticated ? (
                    <button onClick={() => { !isLoading ? handleLogout() : '' }} className="header__option">
                        Logout
                    </button>
                ) : (
                    <div className="header__option">
                        <span className="header__optionLineOne">Hello Guest</span>
                        <span className="header__optionLineTwo">Sign In</span>
                    </div>
                )}
                <div className="header__option">
                    <span className="header__optionLineOne">Returns</span>
                    <span className="header__optionLineTwo">& Orders</span>
                </div>
                <div className="header__option">
                    <span className="header__optionLineOne">Your</span>
                    <span className="header__optionLineTwo">Prime</span>
                </div>
                <div className="header__optionBasket">
                    <ShoppingBasketIcon />
                    <span className="header__optionLineTwo header__basketCount">
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
