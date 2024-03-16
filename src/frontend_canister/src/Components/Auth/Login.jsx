import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/useAuthClient";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import icp from "../../../assets/icp.png";

// Login component
const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle login
  const handleLogin = async () => {
    setIsLoading(true);
    await login().then(() => window.location.reload());
  };

  useEffect(() => {
    // navigate to claim seat if user already authenticated
    if (isAuthenticated) navigate('/dashboard');
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full bg-[#f1f1f1]" style={{ height: `calc(100vh - 93px)` }}>
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl p-4 sm:p-6 md:p-10 lg:p-10 xl:p-12 2xl:p-14 bg-white rounded-xl shadow-lg flex flex-col gap-4">
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-blue-900 underline decoration-2 underline-offset-4">{t("Welcome to W3 Market Place")}</h2>
          <div className="flex mt-4 w-full justify-center">
            <button className="flex gap-2 justify-center items-center py-1 px-4 border-2  rounded-xl cursor-pointer border-blue-900 hover:bg-blue-900 hover:text-white duration-300 ease-in-out"
              onClick={() => { !isLoading ? handleLogin() : '' }} >
              <img src={icp} alt="logo" className="w-10 h-10" />
              <span className="text-md lg:text-lg md:text-lg font-semibold">
                {isLoading ? t("loading...") : t("Login with InternetIdentity")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
