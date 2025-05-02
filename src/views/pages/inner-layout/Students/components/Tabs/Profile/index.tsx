import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import DetailsBox from "../../../../../../../components/DetailsBox";
import { getParents } from "../../../../../../../services/inner-layout/students";
import EditStudent from "../../Form/EditStudent";
import CreateParent from "../../Form/CreateParent";
import EditParent from "../../Form/EditParent";
import "./index.scss";

// Define or import the Parent type
type Parent = {
  gender: string;
  // Add other properties of Parent if needed
};

interface ProfileProps {
  formData: any; // Replace 'any' with the specific type if known
  id: string | number | null; // Adjust the type based on your use case
}

const Profile = ({ formData, id }: ProfileProps) => {
  const [parents, setParents] = useState({ father: null, mother: null });

  const { data: ParentsData, isLoading } = useQuery(
    ["fetchParents", id],
    () => getParents(id ? { student_id: String(id) } : {}),
    { enabled: !!id } // Prevent the query from running when `id` is null or undefined
  );

  useEffect(() => {
    if (ParentsData?.length) {
      setParents({
        father: ParentsData.find((parent: Parent) => parent.gender === "male") || null,
        mother: ParentsData.find((parent: Parent) => parent.gender === "female") || null,
      });
    }
  }, [ParentsData]);

  if (isLoading) {
    return <div>Loading...</div>; // Optionally replace with a loading spinner
  }

  return (
    <div>
      <EditStudent formData={formData} />
      <div className="parents-container">
        {parents.father ? (
          <EditParent formData={parents.father} />
        ) : (
          <DetailsBox 
            title={"Father Details"}
            children={<CreateParent type="father" student_id={id ? String(id) : ""} />}
          />
        )}

        {parents.mother ? (
          <EditParent formData={parents.mother} />
        ) : (
          <DetailsBox 
            title={"Mother Details"}
            children={<CreateParent type="mother" student_id={id ? String(id) : ""} />}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
