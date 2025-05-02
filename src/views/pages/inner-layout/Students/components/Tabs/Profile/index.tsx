import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import DetailsBox from "@app/components/DetailsBox";
import { getParents } from "@app/services/inner-layout/students";
import EditStudent from "../../Form/EditStudent";
import CreateParent from "../../Form/CreateParent";
import EditParent from "../../Form/EditParent";
import "./index.scss";

const Profile = ({ formData, id }) => {
  const [parents, setParents] = useState({ father: null, mother: null });

  const { data: ParentsData, isLoading } = useQuery(
    ["fetchParents", id],
    () => getParents(id ? { student_id: id } : {}),
    { enabled: !!id } // Prevent the query from running when `id` is null or undefined
  );

  useEffect(() => {
    if (ParentsData?.length) {
      setParents({
        father: ParentsData.find((parent) => parent.gender === "male") || null,
        mother: ParentsData.find((parent) => parent.gender === "female") || null,
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
            children={<CreateParent type="father" student_id={id} />}
          />
        )}

        {parents.mother ? (
          <EditParent formData={parents.mother} />
        ) : (
          <DetailsBox 
            title={"Mother Details"}
            children={<CreateParent type="mother" student_id={id} />}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
