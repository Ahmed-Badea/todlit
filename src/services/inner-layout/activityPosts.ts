import { Axios } from "../../tools/axios/axiosInstance";

export interface FieldResponse {
  id: number;
  field: number;
  value: string;
  field_name: string;
}

export interface MediaItem {
  id: number;
  file: string;
  is_video: boolean;
  uploaded_at: string;
}

export interface ActivityPostData {
  id: number;
  activity_name: string | null;
  performed_at: string;
  notes: string;
  notify_parent: boolean;
  field_responses: FieldResponse[];
  media: MediaItem[];
  teacher: number;
}

export const getTeacherActivityPosts = async (teacherId: number): Promise<ActivityPostData[]> => {
  try {
    const response = await Axios.get(`/settings/activity/teacher/${teacherId}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching activity posts:', error);
    throw error;
  }
};
