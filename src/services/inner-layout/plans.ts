import { format } from "date-fns";
import { Axios } from "../../tools/axios/axiosInstance";

// Unified time formatting function
const formatTimeField = (timeValue: any) => {
  if (!timeValue) return null;
  if (timeValue instanceof Date) {
    return format(timeValue, "HH:mm");
  }
  if (typeof timeValue === 'string') {
    const date = new Date(timeValue);
    return format(date, "HH:mm");
  }
  return timeValue;
};

// Fetch all plans
export const getPlans = async () => {
  const response = await Axios.get("/settings/plan");
  return response.data;
};

// Create a new plan
export const createPlan = async ({
  name,
  monthly_fee,
  start_shift,
  end_shift,
  program_color,
  late_checkout_time,
  late_checkout_fees,
}: {
  name: string;
  monthly_fee: string;
  start_shift: any;
  end_shift: any;
  program_color: string;
  late_checkout_time: any;
  late_checkout_fees: string;
}) => {
  const reqBody = {
    name,
    monthly_fee,
    start_shift: formatTimeField(start_shift),
    end_shift: formatTimeField(end_shift),
    program_color,
    late_checkout_time: formatTimeField(late_checkout_time),
    late_checkout_fees,
  };

  return Axios.post("/settings/plan", reqBody);
};

// Update an existing plan
export const updatePlan = async (id: string, data: any) => {
  const reqBody = {
    name: data.name,
    monthly_fee: data.monthly_fee,
    start_shift: formatTimeField(data.start_shift),
    end_shift: formatTimeField(data.end_shift),
    program_color: data.program_color,
    late_checkout_time: formatTimeField(data.late_checkout_time),
    late_checkout_fees: data.late_checkout_fees,
  };

  return Axios.put(`/settings/edit_plan/${id}/`, reqBody);
};
