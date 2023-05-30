import axios from "axios";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const register = async(inputs) => {
    await axios.post(
      "http://localhost:3002/api/auth/register",
      inputs
    );
    await login(inputs);
  }
  const login = async (inputs) => {
    const res = await axios.post(
      "http://localhost:3002/api/auth/login",
      inputs,
      { withCredentials: true, credentials: "include" }
    );
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post(
      "http://localhost:3002/api/auth/logout",
      {},
      {
        withCredentials: true,
        credentials: "include",
      }
    );
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};
