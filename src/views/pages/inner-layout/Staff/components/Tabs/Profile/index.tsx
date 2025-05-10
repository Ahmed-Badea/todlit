import { StaffMember } from "../../../../../../../types/inner-layout/staff/staff";
import EditStaff from "../../Form/EditStaff";

const Profile = ({ formData }: { formData: StaffMember }) => {
  return (
    <div>
      <EditStaff formData={formData} />
    </div>
  );
};

export default Profile;
