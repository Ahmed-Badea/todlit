import { useState, useMemo } from "react";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import InnerLayout from "../../../../views/layout/InnerLayout";
import { getActivityTemplates, ActivityTemplate } from "../../../../services/inner-layout/activityTemplates";
import { getStudents } from "../../../../services/inner-layout/students";
import { useClassesStore } from "../../../../store/classes";
import { Dropdown, DropdownButton, DropdownMenu, DropdownMenuItem, Button } from "../../../../design-system";
import { Checkbox } from "../../../../design-system/components/Checkbox";
import { Loading } from "../../../../design-system";
import { ActivityForm } from "./ActivityForm";
import styles from "./activities.module.scss";

const Activities = () => {
  const { t } = useTranslation();
  const [selectedTemplate, setSelectedTemplate] = useState<ActivityTemplate | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const { classes } = useClassesStore() as unknown as { classes: any[] };

  const { data: templates, isLoading: templatesLoading } = useQuery(
    "activityTemplates",
    getActivityTemplates
  );

  const { data: students, isLoading: studentsLoading } = useQuery(
    ["students", selectedClassId],
    () => getStudents(selectedClassId ? { classroom_id: selectedClassId } : {})
  );

  const isLoading = templatesLoading;

  const handleTemplateClick = (template: ActivityTemplate) => {
    setSelectedTemplate(template);
    setShowForm(true);
  };

  const handleBackToTemplates = () => {
    setShowForm(false);
    setSelectedTemplate(null);
  };

  const handleClassFilterChange = (selectedId: string) => {
    setSelectedClassId(selectedId);
    setSelectedStudents([]);
  };

  const handleStudentToggle = (checked: boolean, studentId: number) => {
    if (checked) {
      setSelectedStudents(prev => [...prev, studentId]);
    } else {
      setSelectedStudents(prev => prev.filter(id => id !== studentId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStudents(students?.map((s: any) => s.id) || []);
    } else {
      setSelectedStudents([]);
    }
  };

  const selectedClassName = useMemo(() => {
    if (!selectedClassId) return "All Classes";
    const selectedClass = classes.find((cls: any) => String(cls.id) === selectedClassId);
    return selectedClass?.name || "Unknown class";
  }, [selectedClassId, classes]);

  return (
    <InnerLayout isLoading={isLoading}>
      <div className={styles["header"]}>
        {" "}
        {selectedTemplate ? (
          <>
            <Button
              variant="link"
              text={t("innerLayout.navbar.activities")}
              onClickHandler={handleBackToTemplates}
            />
            <h4>{` / ${selectedTemplate.name}`}</h4>
          </>
        ) : (
          <h4>{t("innerLayout.navbar.activities")}</h4>
        )}
      </div>

      <div className={styles.container}>
        <div className={styles.sidebar}>
          {showForm && selectedTemplate ? (
            <ActivityForm
              template={selectedTemplate}
              students={
                students?.filter((s: any) => selectedStudents.includes(s.id)) ||
                []
              }
              onBack={handleBackToTemplates}
            />
          ) : (
            <div className={styles["templates-section"]}>
              <div className={styles["templates-header"]}>
                <h4>Activity Templates</h4>
              </div>
              <div className={styles["template-grid"]}>
                {templates?.map((template) => (
                  <div
                    key={template.id}
                    className={styles["template-card"]}
                    onClick={() => handleTemplateClick(template)}
                  >
                    <h5>{template.name}</h5>
                    {template.description && <p>{template.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.details}>
          <div className={styles["details-wrapper"]}>
            <div className={styles["students-section"]}>
              <div className={styles["filter-section"]}>
                <Dropdown>
                  <DropdownButton
                    text={selectedClassName}
                    onClickHandler={() => setDropdownOpen(!dropdownOpen)}
                  />
                  <DropdownMenu>
                    <DropdownMenuItem
                      key="all"
                      text="All Classes"
                      onClickHandler={() => handleClassFilterChange("")}
                      selected={selectedClassId === ""}
                    />
                    {classes?.map((cls: any) => (
                      <DropdownMenuItem
                        key={cls.id}
                        text={cls.name}
                        onClickHandler={() =>
                          handleClassFilterChange(String(cls.id))
                        }
                        selected={selectedClassId === String(cls.id)}
                      />
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className={styles["students-list"]}>
                <div className={styles["students-header"]}>
                  <h4>Students</h4>
                  {students?.length > 0 && (
                    <Checkbox
                      id="select-all"
                      text="Select All"
                      checked={
                        selectedStudents.length === students.length &&
                        students.length > 0
                      }
                      onClickHandler={(checked) => handleSelectAll(checked)}
                    />
                  )}
                </div>
                {studentsLoading ? (
                  <div className={styles["loading-container"]}>
                    <Loading />
                  </div>
                ) : students?.length > 0 ? (
                  students.map((student: any) => (
                    <div key={student.id} className={styles["student-item"]}>
                      <Checkbox
                        id={`student-${student.id}`}
                        text={`${student.first_name} ${student.last_name}`}
                        hintText={student.classroom}
                        checked={selectedStudents.includes(student.id)}
                        onClickHandler={(checked) =>
                          handleStudentToggle(checked, student.id)
                        }
                      />
                    </div>
                  ))
                ) : (
                  <div className={styles["no-data"]}>
                    <p>No students found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </InnerLayout>
  );
};

export default Activities;
