import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { Logo } from "../ui/Logo";

export const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { currentUser, logout } = useContext(AuthContext);

  const route = useLocation().pathname;

  const navbarControl = () => {
    if (window.scrollY > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }

    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", navbarControl);

    return () => {
      window.removeEventListener("scroll", navbarControl);
    };
  });

  return (
    <header
      className={`${show ? "top-0" : "-top-20 "}  fixed w-full transition-all`}
    >
      <div className="flex justify-between items-center px-[5vw] lg:px-[10vw] py-[20px] ">
        <Logo />
        <nav className="flex gap-10 font-poppins">
          <span
            className={`${
              currentUser ? "cursor-pointer text-black hover:text-gray-300" : "text-gray-300"
            } font-medium font-jost transition-colors`}
          >
            {currentUser ? currentUser.username : ".Blog"}
            {" |"}
          </span>
          {!currentUser && (
            <Link to="/signin" className="hover:scale-105 hover:underline ">
              signin
            </Link>
          )}
          {currentUser && (
            <>
              {route === "/create-blog" ? (
                <Link to="/" className="hover:scale-105 hover:underline">
                  save blog
                </Link>
              ) : (
                <Link
                  to="/create-blog"
                  className="hover:scale-105 hover:underline"
                >
                  create blog
                </Link>
              )}
              <button
                className="hover:scale-105 hover:underline"
                onClick={logout}
              >
                logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
