import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "../../components";
import { Authenticated, IsNotAuthenticated } from "../../middleware/middleware";
import { SignInPage, LoginPage, RegisterPage, HomePage } from "../../pages";
import CreateBlog from "../../pages/blog/create";
import DetailBlog from "../../pages/blog/detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/create-blog",
        element: (
          <IsNotAuthenticated>
            <CreateBlog />
          </IsNotAuthenticated>
        ),
      },
      {
        path: "/detail-blog/:id",
        element: <DetailBlog />,
      },
    ],
  },
  {
    path: "/signin",
    element: (
      <Authenticated>
        <SignInPage />
      </Authenticated>
    ),
  },
  {
    path: "/login",
    element: (
      <Authenticated>
        <LoginPage />
      </Authenticated>
    ),
  },
  {
    path: "/register",
    element: (
      <Authenticated>
        <RegisterPage />
      </Authenticated>
    ),
  },
]);
export const Router = () => {
  return (
    <RouterProvider router={router} />
    // -- Old Version --
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Layout />}>
    //       <Route index element={<HomePage />} />
    //       <Route path="/create-blog" element={<CreateBlog />} />
    //       <Route path="/detail-blog" element={<DetailBlog />} />
    //     </Route>
    //     <Route path="/signin" element={<SignInPage />} />
    //     <Route path="/login" element={<LoginPage />} />
    //     <Route path="/register" element={<RegisterPage />} />
    //   </Routes>
    // </BrowserRouter>
  );
};
