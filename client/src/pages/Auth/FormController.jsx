import { useState } from "react";
import { useLocation } from "react-router-dom";

export const useFormController = (inputs, setInputs) => {
  const [error, setError] = useState("");

  const route = useLocation().pathname;

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleValidation = () => {
    let isValid = true;
    let errors = "";

    if (inputs.password.trim() === "") {
      errors = "please enter a password.";
      isValid = false;
    }
    
    if(route === '/register'){
      if (inputs.email.trim() === "") {
        errors = "please enter an email address.";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
        errors = "please enter a valid email address.";
        isValid = false;
      }
    }
    
    if (inputs.username.trim() === "") {
      errors = "please enter a username.";
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  return {
    error,
    setError,
    handleChange,
    handleValidation,
  };
};
