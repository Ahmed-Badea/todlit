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

export const uploadActivityMedia = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await Axios.post("/settings/activity/media/", formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data.id;
};

export const submitStudentActivity = async (payload: StudentActivityPayload) => {
  const response = await Axios.post("/settings/student_activities/", payload);
  return response.data;
};