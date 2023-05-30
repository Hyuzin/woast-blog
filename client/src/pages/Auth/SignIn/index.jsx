import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../../../components/ui/Logo";

export const SignInPage = () => {
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const [isRegisterHovered, setIsRegisterHovered] = useState(false);

  const handleLoginHover = () => setIsLoginHovered(true);
  const handleLoginHoverExit = () => setIsLoginHovered(false);
  const handleRegisterHover = () => setIsRegisterHovered(true);
  const handleRegisterHoverExit = () => setIsRegisterHovered(false);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Logo />
        <div className="flex flex-row gap-4 text-center ">
          <Link
            to="/login"
            className={`${
              isRegisterHovered ? "bg-white text-black" : "bg-black text-white"
            } w-40 py-2 rounded hover:scale-105 hover:bg-white border-[1px] border-black hover:text-black`}
            onMouseEnter={handleLoginHover}
            onMouseLeave={handleLoginHoverExit}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`${
              isLoginHovered ? "bg-black text-white" : "bg-white"
            } border-[1px] border-black w-40 py-2 rounded hover:text-white hover:bg-black hover:scale-105`}
            onMouseEnter={handleRegisterHover}
            onMouseLeave={handleRegisterHoverExit}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
