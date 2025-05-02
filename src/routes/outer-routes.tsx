import Login from "@app/views/pages/outer-layout/Login";
import Register from "@app/views/pages/outer-layout/Register";
import ForgetPassword from "@app/views/pages/outer-layout/ForgetPassword";

export const OUTER_ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  FORGET_PASSWORD: "/forget-password"
};

export const outerLayoutRoutes = [
  { name: "login", path: OUTER_ROUTES.LOGIN, element: <Login /> },
  { name: "register", path: OUTER_ROUTES.REGISTER, element: <Register /> },
  { name: "forget_password", path: OUTER_ROUTES.FORGET_PASSWORD, element: <ForgetPassword /> },
];