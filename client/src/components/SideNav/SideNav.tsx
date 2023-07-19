import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Category } from "../../shared/types/appTypes";
import { GlobalContext } from "../../store/globalContext";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { ActionTypes } from "../../shared/types/storeTypes";
import Accordion from "../Accordion/Accordion";
import { IoSettingsOutline } from "react-icons/io5";
import useHttp from "../../hooks/useHttp";
import { BsCollection } from "react-icons/bs";

const SideNav: React.FC = () => {
  const [authProfile, setAuthProfile] = useState(
    JSON.parse(localStorage.getItem("profile") as string)
  );
  const { userData, logoutUser, fetchCategories, categories } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error, sendRequest } = useHttp();

  const logout = () => {
    logoutUser(ActionTypes.LOGOUT);
    navigate("/");
  };

  useEffect(() => {
    const token = authProfile?.token;

    if (token) {
      const decodedToken = jwt_decode<JwtPayload>(token);
      if (decodedToken.exp && decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
  }, [location]);

  const handleFetchedCategories = (response: { data: Category[] }) => {
    fetchCategories(response.data);
  };

  const getCategories = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const request = {
      url: "http://localhost:8000/categories",
      headers,
    };

    sendRequest(request, handleFetchedCategories);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="h-screen fixed top-0 left-0 w-60 p-6 max-w-xs flex flex-col justify-between text-sm bg-white font-text1">
      {categories.length > 0 ? (
        <>
          <div>
            <Link
              to="/"
              className="font-bold mb-12 inline-block tracking-widest"
            >
              kellyoncall
            </Link>
            <Accordion data={categories} />
          </div>

          <div className="flex flex-col">
            {userData ? (
              <div className="flex items-center my-4 justify-between">
                <div className="font-medium mr-4">
                  Hello {userData.firstName}!
                </div>
                <div className="flex">
                  <Link to="/collections" className="mr-2">
                    <BsCollection size="15" />
                  </Link>
                  <Link to="/settings">
                    <IoSettingsOutline size="16" />
                  </Link>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate("/admin")}
                className="p-4 bg-black text-white mb-2 text-sm rounded-lg"
              >
                LOGIN
              </button>
            )}
            {userData && (
              <button
                className="p-4 bg-black text-white mb-2 rounded-2xl"
                onClick={logout}
              >
                Logout
              </button>
            )}
            {userData ? (
              <Link
                to="/posts/new"
                className="p-4 bg-black text-white text-center rounded-2xl"
              >
                Create a new post
              </Link>
            ) : null}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default SideNav;
