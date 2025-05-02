import { format } from "date-fns";
import { Axios } from "../../tools/axios/axiosInstance";

// Utility function to format time to "HH:mm"
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, "HH:mm"); // Converts to "05:30"
};

// Fetch all plans
export const getPlans = async () => {
  const response = await Axios.get("/settings/plan");
  return response.data;
};

// Create a new plan
export const createPlan = async ({
  name,
  fees,
  start_shift,
  end_shift,
  program_color,
  late_checkout_time,
  late_checkout_fees,
}: {
  name: string;
  fees: string;
  start_shift: string;
  end_shift: string;
  program_color: string;
  late_checkout_time: string;
  late_checkout_fees: string;
}) => {
  // Format time fields before sending the request
  const reqBody = {
    name,
    fees,
    start_shift: formatTime(start_shift),
    end_shift: formatTime(end_shift),
    program_color,
    late_checkout_time: formatTime(late_checkout_time),
    late_checkout_fees,
  };

  return Axios.post("/settings/plan", reqBody);
};
