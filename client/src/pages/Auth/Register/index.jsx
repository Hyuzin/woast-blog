import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../../components/ui/Logo";
import { useFormController } from "../FormController";
import { FormInput } from "../../../components/ui/FormInput";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/authContext";

export const RegisterPage = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { error, handleChange, setError, handleValidation } = useFormController(
    inputs,
    setInputs
  );

  const { register } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      try {
        await register(inputs);
        navigate("/");
      } catch (err) {
        setError(err.response.data);
      }
    }
  };

  const inputFields = [
    { name: "username", type: "text", placeholder: "Username" },
    { name: "email", type: "text", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
  ];

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <form
        className="flex flex-col items-center gap-3"
        onSubmit={handleRegister}
      >
        <Logo />
        {error && <p className="text-center text-red-500">{error}</p>}
        {inputFields.map((field) => (
          <FormInput
            key={field.name}
            type={field.type}
            name={field.name}
            onChange={handleChange}
            placeholder={field.placeholder}
          />
        ))}
        <button
          className="bg-black text-white w-40 py-2 rounded hover:bg-white border-[1px] border-black hover:text-black transition-all"
          type="submit"
        >
          Register
        </button>
        <Link to="/login" className="transition-all hover:underline">
          login here.
        </Link>
      </form>
    </div>
  );
};
