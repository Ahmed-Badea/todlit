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

interface CheckInDetails {
  time: string | null;
  name: string | null;
  id: number | null;
  user_type: string | null;
}

interface AttendanceRecord {
  date: string;
  check_in_details: CheckInDetails;
  check_out_details: CheckInDetails;
}

export interface MonthlyAttendance {
  student_id: number;
  first_name: string;
  last_name: string;
  class_name: string;
  class_id: number;
  month: string;
  attendance: AttendanceRecord[];
}

type CheckInPayload = AttendanceActionPayload | BulkCheckInItem[];
type CheckOutPayload = AttendanceActionPayload | BulkCheckOutItem[];

export const getAttendance = async (filters: FilterParams = {}) => {
  const params = new URLSearchParams(filters as any);
  const url = `/dashboard/attendance${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await Axios.get(url);
  return response.data;
};

export const getMonthlyAttendance = async (
  studentId: number,
  month: string
): Promise<MonthlyAttendance> => {
  const response = await Axios.get(
    `/dashboard/monthly_attendance?student_id=${studentId}&month=${month}`
  );
  return response.data;
};

export const checkInAttendance = async (payload: CheckInPayload) => {
  const response = await Axios.post("/dashboard/checkin/", payload);
  return response.data;
};

export const checkOutAttendance = async (payload: CheckOutPayload) => {
  const response = await Axios.post("/dashboard/checkout/", payload);
  return response.data;
};
