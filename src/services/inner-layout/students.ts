import { Axios } from "../../tools/axios/axiosInstance";
import { formatDate } from '../../utils/formatDate';

interface StudentData {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  status: string;
  classroom: string;
}

interface ParentData {
  first_name: string,
  last_name: string,
  gender: string,
  phone: string,
  email: string,
  student_id: string
}

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
export const createStudent = async (student: StudentData) => {
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
export const updateStudent = async (id: string, student: StudentData) => {
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

export const createParent = async (parent: ParentData) => {
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

export const updateParent = async (id: string, parent: ParentData) => {
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