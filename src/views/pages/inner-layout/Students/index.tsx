import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { useTranslation } from 'react-i18next';
import { useClassesStore } from '../../../../store/classes';
import { Table, Dropdown, DropdownButton, DropdownMenu, DropdownMenuItem } from"../../../../design-system";
import { getStudents } from "../../../../services/inner-layout/students";
import InnerLayout from "../../../../views/layout/InnerLayout";
import CreateStudent from "./components/Form/CreateStudent";
import { IRow } from "../../../../design-system/types/Table/table";
import { Language } from "../../../../types";
import columns from "./studentTableStruc.json";
import styles from "./students.module.scss";

const Students = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { classes } = useClassesStore();

  const [classFilter, setClassFilter] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // On first load: convert ?class=className to class ID
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const classParam = searchParams.get("class");
    if (classParam && classes.length > 0) {
      const matchedClass = classes.find((cls: { id: number; name: string }) => cls.name === classParam);
      if (matchedClass) {
        setClassFilter(String(matchedClass.id));
      } else {
        setClassFilter('');
      }
    }
  }, [classes, location.search]);
  const {
    data: studentsData,
    error,
    isLoading,
    isFetching,
    refetch,
  }: {
    data: any;
    error: { message?: string } | null;
    isLoading: boolean;
    isFetching: boolean;
    refetch: () => void;
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
    setDropdownOpen(!dropdownOpen);
  };

  
  const handleRowClick = (row: IRow) => {
    navigate(`/students/${row.id}`);
  };

  const handleClassFilterChange = (selectedId: string) => {
    setClassFilter(selectedId);

    const selectedClass = classes.find((cls: { id: number; name: string }) => String(cls.id) === selectedId);
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
    const selectedClass = classes.find((cls: { id: number; name: string }) => String(cls.id) === classFilter);
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
                {classes?.map((option: { id: number; name: string }) => (
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
