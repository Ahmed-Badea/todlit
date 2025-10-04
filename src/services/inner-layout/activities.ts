import { Axios } from "../../tools/axios/axiosInstance";

export interface CustomField {
  id: number;
  field_type: string;
  field_name: string;
}

export interface Activity {
  id: number;
  name: string;
  description: string;
  icon: string | null;
  custom_fields: CustomField[];
}

export interface ActivitiesResponse {
  enabled_activities: Activity[];
  predefined_activities: Activity[];
}

export interface UpdateActivityPayload {
  activity_id: number;
  custom_name: string;
  custom_field: {
    field_type: string;
    field_name: string;
    value: string;
  };
}

export const getActivities = async (): Promise<ActivitiesResponse> => {
  const response = await Axios.get("/settings/nursery/activities/");
  return response.data;
};

export const updateActivity = async (payload: UpdateActivityPayload) => {
  const response = await Axios.post("/settings/activities/update/", payload);
  return response.data;
};

export const updateActivitySettings = async (activityId: number, settings: any) => {
  const response = await Axios.post("/settings/activities/update/", {
    activity_id: activityId,
    ...settings
  });
  return response.data;
};