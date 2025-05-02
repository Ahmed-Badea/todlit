import { useEffect } from "react";
import { useQuery } from "react-query";
import { useTranslation } from 'react-i18next';
import { getClasses } from "@app/services/inner-layout/classes";
import Card from "./components/Card";
import InnerLayout from "@app/views/layout/innerLayout";
import { IClass } from "@app/types/inner-layout/classes";
import CreateClass from "./components/Form/CreateClass";
import styles from "./classes.module.scss";

const Classes = () => {
  const { t } = useTranslation();

  const {
    data: classesData,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useQuery("fetchClasses", getClasses);

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Delete handler (you can connect it to an actual backend delete function)
  const handleDeleteClass = (id: string) => {
    console.log(`Delete classroom with id ${id}`);
    // Example: Call a delete API here to remove the class
    // deleteClass(id);
  };

  return (
    <InnerLayout isLoading={isLoading || isFetching} error={error} errorMessage={error?.message}>
      <div className={styles.header}>
        <h3>{t("innerLayout.classes.title")}</h3> {/* Translated title */}
        <CreateClass />
      </div>
      <div className={styles['classroom-list']}>
        {classesData?.map(({ id, name, capacity, min_age, max_age, staff_count, students_count }: IClass) => (
          <Card
            key={id}
            roomName={name}
            students={students_count || 0} // Fallback to 0 if undefined or null
            activeStudents={students_count || 0} // Assuming all students are active
            staff={staff_count || 0} // Fallback to 0 if undefined or null
            activeStaff={staff_count || 0} // Assuming all staff are active
            capacity={capacity || 0} // Fallback to 0 if undefined or null
            minAge={min_age?.toString() || 'N/A'} // Handle undefined min_age
            maxAge={max_age?.toString() || 'N/A'} // Handle undefined max_age
            onDelete={() => handleDeleteClass(id)}
          />
        ))}
      </div>
    </InnerLayout>
  );
};

export default Classes;
