import { Axios } from "../../tools/axios/axiosInstance";

export interface FieldResponse {
  field: number;
  value: string;
  option?: number;
}

export interface StudentActivityPayload {
  student_ids: number[];
  teacher: number;
  activity_template: number;
  notes: string;
  media_ids: number[];
  notify_parent: boolean;
  field_responses: FieldResponse[];
}

export const submitStudentActivity = async (payload: StudentActivityPayload) => {
  const response = await Axios.post("/settings/student_activities/", payload);
  return response.data;
};