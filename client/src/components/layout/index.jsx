import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Layout = () => {
  const route = useLocation().pathname;
  const routeSelector = () => {
    switch (route) {
      default:
        return `pt-24 max-w-6xl`;
    }
  };

  return (
    <main>
      <Navbar />
      <div className={`${routeSelector()} px-5 pb-10 mx-auto`}>
        <Outlet />
      </div>
    </main>
  );
};
