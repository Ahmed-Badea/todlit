import { Axios } from "../../tools/axios/axiosInstance";

// Fetch dashboard view data
export const getDashboardView = async () => {
  try {
    const response = await Axios.get('/dashboard/get_dashboard_view/');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard view:', error);
    throw error;
  }
};

// Legacy function for backward compatibility - can be removed after migration
export const getDashboardStats = async () => {
  try {
    const [studentsResponse, staffResponse, classesResponse] = await Promise.all([
      Axios.get('/dashboard/student'),
      Axios.get('/dashboard/teacher'),
      Axios.get('/dashboard/classroom')
    ]);

    return {
      students: studentsResponse.data.length,
      teachers: staffResponse.data.length,
      classes: classesResponse.data.length,
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};