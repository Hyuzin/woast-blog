import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const Authenticated = ({ children }) => {
  const { currentUser: isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(-1);
    }
  });

  return children;
};

export const IsNotAuthenticated = ({ children }) => {
  const { currentUser: isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(-1);
    }
  });

  return children;
};
