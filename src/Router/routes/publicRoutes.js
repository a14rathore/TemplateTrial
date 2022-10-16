import ForgotPassword from "../../pages/PublicPage/ForgotPassword";
import Login from "../../pages/PublicPage/Login";

const PublicRoute = [
  {
    path: "/",
    exact: true,
    component: <Login />,
  },
  {
    path: "/forgotpassword",
    exact: true,
    component: <ForgotPassword />,
  },
];

export default PublicRoute;
