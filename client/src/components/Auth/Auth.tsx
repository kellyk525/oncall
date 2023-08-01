import React, { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionTypes } from "shared/types/storeTypes";
import { GlobalContext } from "store/globalContext";

const Auth: React.FC = () => {
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const { signinUser } = useContext(GlobalContext);
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();

  const handleSignIn = async (formData: FormData) => {
    try {
      const userData = await fetch(
        "https://kellyoncall.onrender.com/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.get("email"),
            password: formData.get("password"),
          }),
        }
      ).then((res) => res.json());

      const userInfo = userData.data.result;
      const userSessionToken = userData.data.token;

      const savedUserData = {
        user: userInfo,
        token: userSessionToken,
      };

      signinUser(ActionTypes.AUTH, savedUserData);
      navigate("/");
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleSignUp = async (formData: FormData) => {
    try {
      const userData = await fetch(
        "https://kellyoncall.onrender.com/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.get("email"),
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
            role: formData.get("role"),
          }),
        }
      ).then((res) => res.json());

      const userInfo = userData.data.result;
      const userSessionToken = userData.data.token;

      const savedUserData = {
        user: userInfo,
        token: userSessionToken,
      };

      signinUser(ActionTypes.AUTH, savedUserData);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (isSignIn) {
      handleSignIn(formData);
    } else {
      handleSignUp(formData);
    }
  };

  const clearFormInputs = () => {
    setUserData({
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    });
  };

  const toggleForm = () => {
    setIsSignIn((prev) => !prev);
  };

  return (
    <main className="max-w-5xl min-h-screen ml-60 p-6 text-sm bg-background font-text1">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white rounded p-4"
      >
        <div className="flex mb-4">
          <label htmlFor="email" className="mr-3">
            Email:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter Email"
          />
        </div>
        {!isSignIn && (
          <>
            <div className="flex mb-4">
              <label htmlFor="firstName" className="mr-3">
                First Name:
              </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="Enter First Name"
              />
            </div>
            <div className="flex mb-4">
              <label htmlFor="lastName" className="mr-3">
                Last Name:
              </label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
              />
            </div>
          </>
        )}
        <div className="flex mb-4">
          <label htmlFor="password" className="mr-3">
            Password:
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter Password"
          />
        </div>
        {!isSignIn && (
          <>
            <div className="flex mb-4">
              <label htmlFor="confirmPassword" className="mr-3">
                Confirm Password:
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="role" className="mr-3">
                Select Role:
              </label>
              <select id="role" name="role">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </>
        )}
        <button
          type="submit"
          className="bg-slate-100 p-2 px-4 w-fit mb-2 rounded"
        >
          {isSignIn ? "Log In" : "Sign Up"}
        </button>
        <button
          type="button"
          onClick={toggleForm}
          className="bg-sky-100 w-fit p-2 px-4 rounded"
        >
          {isSignIn
            ? "Don't have an account? Sign up!"
            : "Already have an account? Sign in!"}
        </button>
      </form>
    </main>
  );
};

export default Auth;
