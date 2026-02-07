import Login from "../views/pages/outer-layout/Login";
import Register from "../views/pages/outer-layout/Register";
import ForgetPassword from "../views/pages/outer-layout/ForgetPassword";
import PrivacyPolicy from "../views/pages/outer-layout/PrivacyPolicy";

export const OUTER_ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  FORGET_PASSWORD: "/forget-password",
  PRIVACY_POLICY: "/privacy-policy"
};

export const outerLayoutRoutes = [
  { name: "login", path: OUTER_ROUTES.LOGIN, element: <Login /> },
  { name: "register", path: OUTER_ROUTES.REGISTER, element: <Register /> },
  { name: "forget_password", path: OUTER_ROUTES.FORGET_PASSWORD, element: <ForgetPassword /> },
  { name: "privacy_policy", path: OUTER_ROUTES.PRIVACY_POLICY, element: <PrivacyPolicy /> },
];