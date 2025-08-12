import { Axios } from "../../tools/axios/axiosInstance";

interface FilterParams {
  student_id?: string;
  class_id?: string;
  month?: string;
  start_date?: string;
  end_date?: string;
}

interface AttendanceActionPayload {
  student: string;
  teacher: string;
}

interface BulkCheckInItem {
  student: string;
  parent: string;
  checkin_time: string;
}

interface BulkCheckOutItem {
  student: string;
  parent: string;
  checkout_time: string;
}

type CheckInPayload = AttendanceActionPayload | BulkCheckInItem[];
type CheckOutPayload = AttendanceActionPayload | BulkCheckOutItem[];

// Fetch attendance
export const getAttendance = async (filters: FilterParams = {}) => {
  const params = new URLSearchParams(filters as any);
  const url = `/dashboard/attendance${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await Axios.get(url);
  return response.data;
};

// Check In students (single or bulk)
export const checkInAttendance = async (payload: CheckInPayload) => {
  const response = await Axios.post("/dashboard/checkin/", payload);
  return response.data;
};

// Check Out students (single or bulk)
export const checkOutAttendance = async (payload: CheckOutPayload) => {
  const response = await Axios.post("/dashboard/checkout/", payload);
  return response.data;
};
