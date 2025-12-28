import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import EditPlanAssociation from "../../Form/EditPlanAssociation";
import { Axios } from "../../../../../../../tools/axios/axiosInstance";


interface PlanAssociation {
  id: number;
  plan: number;
  student: number;
  created_at: string;
}

const Billing = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch current student plan association
  const { data: currentAssociation, isLoading } = useQuery<PlanAssociation>(
    ['fetchStudentPlan', id],
    () => Axios.get(`/settings/plan/association?student_id=${id}`).then(res => res.data),
    { enabled: !!id }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {currentAssociation ? (
        <EditPlanAssociation
          formData={currentAssociation}
          studentId={id || ''}
        />
      ) : (
        <EditPlanAssociation
          formData={{ id: 0, plan: 0, student: parseInt(id || '0'), created_at: '' }}
          studentId={id || ''}
        />
      )}
    </div>
  );
};

export default Billing;
