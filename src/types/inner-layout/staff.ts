export interface FilterParams {
  classroom_id?: string;
}

export interface StaffMember {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  gender: string | null;
  classrooms: any[]; // you can replace `any` with a proper `Classroom` type if you have one
};
