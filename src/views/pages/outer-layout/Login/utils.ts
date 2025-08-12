import type { NavigateFunction } from "react-router-dom";
import { addToLocalStorage } from "../../../../utils/manageLocalStorage";
import { INNER_ROUTES } from "../../../../routes/inner-routes";

export const redirectToDashboard= (navigate: NavigateFunction) => {
  const dashboardRoute = INNER_ROUTES.STUDENTS;
  navigate(dashboardRoute);
};

const setDataToLocalStorage = (response: any) => {
  const accessToken = response.data.access;
  const refreshToken = response.data.refresh;
  const user = response.data.user;
  
  addToLocalStorage("token", accessToken);
  addToLocalStorage("refresh_token", refreshToken);
  addToLocalStorage("first_name", user.first_name);
  addToLocalStorage("last_name", user.last_name);
  addToLocalStorage("nursery_name", user.tenant.en_name);
  addToLocalStorage("X-Tenant-ID", user.tenant.en_name);
  addToLocalStorage("teacher_id", user.id);
};

export const handleAfterLogin = async (response: any, navigate: NavigateFunction) => {
  setDataToLocalStorage(response);
  redirectToDashboard(navigate);
};