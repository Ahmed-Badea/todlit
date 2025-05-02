import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { useTranslation } from 'react-i18next';
import { useClassesStore } from '@app/store/classes';
import { Table, Dropdown, DropdownButton, DropdownMenu, DropdownMenuItem } from "@design-system";
import { getStudents } from "@app/services/inner-layout/students";
import InnerLayout from "@app/views/layout/innerLayout";
import CreateStudent from "./components/Form/CreateStudent";
import columns from "./studentTableStruc.json";
import styles from "./students.module.scss";

const Students = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { classes } = useClassesStore();

  const searchParams = new URLSearchParams(location.search);
  const [classFilter, setClassFilter] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // On first load: convert ?class=className to class ID
  useEffect(() => {
    const classParam = searchParams.get("class");
    if (classParam && classes.length > 0) {
      const matchedClass = classes.find(cls => cls.name === classParam);
      if (matchedClass) {
        setClassFilter(String(matchedClass.id));
      } else {
        setClassFilter('');
      }
    }
  }, [classes]);

  const {
    data: studentsData,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useQuery(
    ["fetchStudents", classFilter],
    () => getStudents(classFilter ? { classroom_id: classFilter } : {})
  );

  useEffect(() => {
    if (classFilter !== undefined) {
      refetch();
    }
  }, [classFilter, refetch]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleRowClick = (row: { id: string }) => {
    navigate(`/students/${row.id}`);
  };

  const handleClassFilterChange = (selectedId: string) => {
    setClassFilter(selectedId);

    const selectedClass = classes.find(cls => String(cls.id) === selectedId);
    const params = new URLSearchParams(location.search);

    if (selectedClass) {
      params.set("class", selectedClass.name); // keep name in URL for readability
    } else {
      params.delete("class");
    }

    navigate(`${location.pathname}?${params.toString()}`);
    queryClient.invalidateQueries("fetchStudents");
  };

  // For dropdown button label
  const selectedClassName = useMemo(() => {
    if (!classFilter) return t("innerLayout.students.allClasses") || "All classes";
    const selectedClass = classes.find(cls => String(cls.id) === classFilter);
    return selectedClass?.name || "Unknown class";
  }, [classFilter, classes, t]);

  return (
    <InnerLayout
      isLoading={isLoading || isFetching}
      error={error}
      errorMessage={error?.message}
    >
      <div className={styles.header}>
        <h3>{t("innerLayout.students.title")}</h3>
        <div className={styles.filters_container}>
          <Dropdown>
            <DropdownButton
              text={selectedClassName}
              onClickHandler={toggleDropdown}
            />
            <DropdownMenu>
              <DropdownMenuItem
                key="all"
                text={t("innerLayout.students.allClasses")}
                onClickHandler={() => handleClassFilterChange('')}
                selected={classFilter === ''}
              />
              {classes?.map((option) => (
                <DropdownMenuItem
                  key={option.id}
                  text={option.name}
                  onClickHandler={() => handleClassFilterChange(String(option.id))}
                  selected={classFilter === String(option.id)}
                />
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <CreateStudent />
      </div>
      <Table
        language={lang}
        columns={columns}
        data={studentsData}
        rowClickHandler={handleRowClick}
      />
    </InnerLayout>
  );
};

export default Students;
