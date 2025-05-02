import { Axios } from "../../tools/axios/axiosInstance";

// Fetch all classes with optional filters
export const getClasses = async (filters = {}) => {
  const params = new URLSearchParams(filters as any);
  const url = `/dashboard/classroom${params.toString() ? `?${params.toString()}` : ''}`;
  
  const response = await Axios.get(url);
  return response.data;
};

export const createClass = async ({
  name,
  branch,
  min_age,
  max_age,
  capacity
}: {
  name: string;
  branch: string;
  min_age: string;
  max_age: string;
  capacity: string;
}) => {
  const reqBody = {
    name: name,
    branch: branch,
    min_age: min_age,
    max_age: max_age,
    capacity: capacity
  };

  return Axios.post(`/dashboard/classroom/`, reqBody);
};