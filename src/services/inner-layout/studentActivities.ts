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

export const getStudentActivities = async (filters: { student_id?: number; classroom_id?: number } = {}) => {
  const params = new URLSearchParams();
  if (filters.student_id) params.append('student_id', filters.student_id.toString());
  if (filters.classroom_id) params.append('classroom_id', filters.classroom_id.toString());

  const url = `/settings/student_activities/${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await Axios.get(url);
  return response.data;
};