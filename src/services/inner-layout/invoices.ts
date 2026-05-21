import { Axios } from "../../tools/axios/axiosInstance";

export interface Invoice {
  id: number;
  student: number;
  plan: number;
  plan_name: string;
  start_date: string;
  end_date: string;
  amount: string;
  is_paid: boolean;
  paid_at: string | null;
  created_at: string;
}

interface InvoiceFilterParams {
  year?: string;
  month?: string;
  classroom_id?: string;
}

// Fetch current invoice for a student
export const getCurrentInvoice = async (studentId: string) => {
  const response = await Axios.get(`/settings/students/${studentId}/invoice/current/`);
  return response.data;
};

// Fetch invoice history for a student
export const getInvoiceHistory = async (studentId: string) => {
  const response = await Axios.get(`/settings/students/${studentId}/invoices/history/`);
  return response.data;
};

// Pay invoice
export const payInvoice = async (invoiceId: number) => {
  const response = await Axios.post(`/settings/invoices/${invoiceId}/pay/`);
  return response.data;
};

// Fetch all invoices with optional filters
export const getInvoices = async (filters: InvoiceFilterParams = {}) => {
  const params = new URLSearchParams();
  if (filters.year) params.append("year", filters.year);
  if (filters.month) params.append("month", filters.month);
  if (filters.classroom_id) params.append("classroom_id", filters.classroom_id);
  
  const url = `/settings/invoices${params.toString() ? `?${params.toString()}` : ''}`;
  
  const response = await Axios.get(url);
  return response.data;
};