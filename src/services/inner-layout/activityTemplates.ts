import { Axios } from "../../tools/axios/axiosInstance";

export interface ActivityTemplateValue {
  id: number;
  value: string;
}

export interface ActivityTemplateField {
  id: number;
  field_name: string;
  field_type: string;
  values: ActivityTemplateValue[];
}

export interface ActivityTemplate {
  id: number;
  name: string;
  description: string;
  custom_fields: ActivityTemplateField[];
}

export const getActivityTemplates = async (): Promise<ActivityTemplate[]> => {
  const response = await Axios.get("/settings/activity_templates/");
  return response.data;
};