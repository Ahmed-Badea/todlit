import { Axios } from "../../tools/axios/axiosInstance";

interface FilterParams {
  student_id?: string;
  class_id?: string;
  month?: string;
  start_date?: string;
  end_date?: string;
}

interface AttendanceActionPayload {
  student_ids: string[];
  date?: string; // optional, ISO string
}

// Fetch attendance
export const getAttendance = async (filters: FilterParams = {}) => {
  const params = new URLSearchParams(filters as any);
  const url = `/dashboard/attendance${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await Axios.get(url);
  return response.data;
};

// Check In students
export const checkInAttendance = async (payload: AttendanceActionPayload) => {
  const response = await Axios.post("/dashboard/checkin", payload);
  return response.data;
};

// Check Out students
export const checkOutAttendance = async (payload: AttendanceActionPayload) => {
  const response = await Axios.post("/dashboard/checkout", payload);
  return response.data;
};
