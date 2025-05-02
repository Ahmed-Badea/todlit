import { Axios } from "../../tools/axios/axiosInstance";

interface StaffData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  classroom: string;
}

interface FilterParams {
  teacher_id?: string;
}

// Fetch all students with optional filters
export const getStaff = async (filters: FilterParams = {}) => {
  const params = new URLSearchParams(filters as any);
  const url = `/dashboard/teacher${params.toString() ? `?${params.toString()}` : ''}`;
  
  const response = await Axios.get(url);
  return response.data;
};

// Update an existing staff
export const createStaff = async (staff: StaffData) => {
  const reqBody = {
    first_name: staff.first_name,
    last_name: staff.last_name,
    email: staff.email,
    phone: staff.phone,
    gender: staff.gender,
    classroom: staff.classroom,
  };

  return Axios.post("/dashboard/teacher/", reqBody);
};

// Update an existing staff
export const updateStaff = async (id: string, staff: StaffData) => {
  const reqBody = {
    first_name: staff.first_name,
    last_name: staff.last_name,
    email: staff.email,
    phone: staff.phone,
    gender: staff.gender,
    classroom: staff.classroom,
  };

  return Axios.put(`/dashboard/teacher_update/${id}`, reqBody);
};
