import { Axios } from "../../tools/axios/axiosInstance";

export interface PlanAssociation {
  id: number;
  plan: number;
  student: number;
  created_at: string;
}

export const getPlanAssociations = async (studentId: number): Promise<PlanAssociation[]> => {
  const response = await Axios.get(`/settings/plan/association`, {
    params: { student_id: studentId }
  });
  return response.data;
};
