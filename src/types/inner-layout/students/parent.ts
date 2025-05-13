export interface FilterParams {
  classroom_id?: string;
}

export interface IParent {
  first_name: string,
  last_name: string,
  gender: string | undefined,
  phone: string,
  email: string,
  student_id?: string
}
