import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { useTranslation } from 'react-i18next';
import { useClassesStore } from '../../../../store/classes';
import { Table, Dropdown, DropdownButton, DropdownMenu, DropdownMenuItem } from"../../../../design-system";
import { getStaff } from "../../../../services/inner-layout/staff";
import InnerLayout from "../../../../views/layout/InnerLayout";
import CreateStaff from "./components/Form/CreateStaff";
import columns from "./staffTableStruc.json";
import styles from "./staff.module.scss";
import { IRow } from "../../../../design-system/types/Table/table";
import { Language } from "../../../../types";

const Staff = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const { classes }= useClassesStore();

  // Parse URL parameters
  const searchParams = new URLSearchParams(location.search);
  const initialClassFilter = searchParams.get('class') || '';

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [classFilter, setClassFilter] = useState(initialClassFilter);

  const {
    data: staffData,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useQuery(["fetchStaff", classFilter], () => {
    // Find class ID from the class name and send it to the backend
    const selectedClass = classes.find(cls => cls.name === classFilter);
    return getStaff(selectedClass ? { classroom_id: selectedClass.id } : {});
  });

  useEffect(() => {
    refetch();
  }, [classFilter, refetch]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleRowClick = (row: IRow) => {
      navigate(`/students/${row.id}`);
  };

  const handleClassFilterChange = (selectedName: string) => {
    setClassFilter(selectedName);

    const params = new URLSearchParams(location.search);

    // Update the URL with the class name
    if (selectedName) {
      params.set('class', selectedName);
    } else {
      params.delete('class');
    }

    navigate(`${location.pathname}?${params.toString()}`);
    queryClient.invalidateQueries("fetchStaff");
  };

  // For dropdown button label (display class name based on selected class ID)
  const selectedClassName = useMemo(() => {
    if (!classFilter) return t("innerLayout.staff.allClasses");
    return classFilter; // Use class name directly
  }, [classFilter, t]);

  return (
    <InnerLayout isLoading={isLoading || isFetching} error={!!error} errorMessage={(error as Error)?.message}>
      <div className={styles.header}>
        <h3>{t("innerLayout.staff.title")}</h3>
        <div className={styles.filters_container}>
          <Dropdown>
            <DropdownButton
              text={selectedClassName}
              onClickHandler={toggleDropdown}
            />
            <DropdownMenu>
              <DropdownMenuItem
                key="all"
                text={t("innerLayout.staff.allClasses")}
                onClickHandler={() => handleClassFilterChange('')}
                selected={classFilter === ''}
              />
              {classes?.map((option: { id: string; name: string }) => (
                <DropdownMenuItem
                  key={option.id}
                  text={option.name}
                  onClickHandler={() => handleClassFilterChange(option.name)}
                  selected={classFilter === option.name}
                />
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <CreateStaff />
      </div>
      <Table
        language={lang}
        columns={columns.map(col => ({
          ...col,
          dataType: (col.dataType as any) // Replace 'any' with your DataType enum if available, e.g. DataType[col.dataType as keyof typeof DataType]
        }))}
        data={staffData}
        rowClickHandler={handleRowClick}
      />
    </InnerLayout>
  );
};

export default Staff;
