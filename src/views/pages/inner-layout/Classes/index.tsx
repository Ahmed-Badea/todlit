import { useEffect } from "react";
import { useQuery } from "react-query";
import { useTranslation } from 'react-i18next';
import { getClasses } from "../../../../services/inner-layout/classes";
import Card from "./components/Card";
import InnerLayout from "../../../../views/layout/InnerLayout";
import { IClass } from "../../../../types/inner-layout/classes/classes";
import CreateClass from "./components/Form/CreateClass";
import styles from "./classes.module.scss";

const Classes: React.FC = () => {
  const { t } = useTranslation();

  const {
    data: classesData,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useQuery<IClass[], Error>("fetchClasses", getClasses);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDeleteClass = (id: string) => {
    console.log(`Delete classroom with id ${id}`);
  };

  return (
    <InnerLayout isLoading={isLoading || isFetching} error={!!error} errorMessage={error?.message}>
      <div className={styles.header}>
        <h3>{t("innerLayout.classes.title")}</h3>
        <CreateClass />
      </div>
      <div className={styles['classroom-list']}>
        {classesData?.map(({ id, name, capacity, min_age, max_age, staff_count, students_count }) => (
          <Card
            key={id}
            roomName={name}
            students={students_count ?? 0}
            activeStudents={students_count ?? 0}
            staff={staff_count ?? 0}
            activeStaff={staff_count ?? 0}
            capacity={capacity ?? 0}
            minAge={typeof min_age === 'number' ? min_age.toString() : 'N/A'}
            maxAge={typeof max_age === 'number' ? max_age.toString() : 'N/A'}
            onDelete={() => handleDeleteClass(id)}
          />
        ))}
      </div>
    </InnerLayout>
  );
};

export default Classes;
