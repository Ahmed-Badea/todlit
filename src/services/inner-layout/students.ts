import { Axios } from "../../tools/axios/axiosInstance";
import { formatDate } from '../../utils/formatDate';
import type { IParent } from "../../types/inner-layout/students/parent";
import type { IStudent } from "../../types/inner-layout/students/student";

interface FilterParams {
  student_id?: string;
  classroom_id?: string;
}

// Fetch all students with optional filters
export const getStudents = async (filters: FilterParams = {}) => {
  const params = new URLSearchParams(filters as any);
  const url = `/dashboard/student${params.toString() ? `?${params.toString()}` : ''}`;
  
  const response = await Axios.get(url);
  return response.data;
};

// Create a new student
export const createStudent = async (student: IStudent) => {
  const formattedDateOfBirth = formatDate(student.date_of_birth);

  const reqBody = {
    first_name: student.first_name,
    last_name: student.last_name,
    date_of_birth: formattedDateOfBirth,
    gender: student.gender,
    status: student.status,
    classroom: student.classroom,
  };

  return Axios.post(`/dashboard/student/`, reqBody);
};

// Update an existing student
export const updateStudent = async (id: string, student: IStudent) => {
  const formattedDateOfBirth = formatDate(student.date_of_birth);
      
  const reqBody = {
    first_name: student.first_name,
    last_name: student.last_name,
    date_of_birth: formattedDateOfBirth,
    gender: student.gender,
    status: student.status,
    classroom: student.classroom,
  };

  return Axios.put(`/dashboard/student_update/${id}`, reqBody);
};

export const getParents = async (filters: FilterParams = {}) => {
  const params = new URLSearchParams(filters as any);
  const url = `/dashboard/parent/${params.toString() ? `?${params.toString()}` : ''}`;
  
  const response = await Axios.get(url);
  return response.data;
};

export const createParent = async (parent: IParent) => {
  const reqBody = {
    first_name: parent.first_name,
    last_name: parent.last_name,
    gender: parent.gender,
    phone: parent.phone,
    email: parent.email,
    student_id: parent.student_id
  };

  return Axios.post(`/dashboard/parent/`, reqBody);
};

export const updateParent = async (id: string, parent: IParent) => {
  const reqBody = {
    first_name: parent.first_name,
    last_name: parent.last_name,
    gender: parent.gender,
    phone: parent.phone,
    email: parent.email,
    student_id: parent.student_id
  };

  return Axios.put(`/dashboard/student_update/${id}`, reqBody);
};