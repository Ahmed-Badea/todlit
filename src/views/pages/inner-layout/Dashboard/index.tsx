import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import InnerLayout from "../../../../views/layout/InnerLayout";
import StatCard from "../../../../components/StatCard";
import ActivityPost from "../../../../components/ActivityPost";
import { getDashboardView } from "../../../../services/inner-layout/dashboard";
import styles from "./dashboard.module.scss";

const Dashboard = () => {
  const { t } = useTranslation();
  const { data: dashboardData, isLoading: statsLoading } = useQuery('dashboardView', getDashboardView);

  // Dummy activities data for UI testing
  const dummyActivities = [
    {
      id: 1,
      student: {
        first_name: "Ahmed",
        last_name: "Mohamed",
      },
      teacher: {
        first_name: "Sarah",
        last_name: "Johnson",
        profile_image: "https://via.placeholder.com/40x40/007bff/ffffff?text=SJ"
      },
      activity_template: {
        name: "Reading Assessment"
      },
      created_at: "2025-12-29T10:30:00Z",
      field_responses: [
        { field_name: "Progress", field_type: "text", value: "Excellent progress" },
        { field_name: "Level", field_type: "text", value: "Level 3" }
      ]
    },
    {
      id: 2,
      student: {
        first_name: "Fatima",
        last_name: "Ali",
      },
      teacher: {
        first_name: "Michael",
        last_name: "Brown",
        profile_image: "https://via.placeholder.com/40x40/28a745/ffffff?text=MB"
      },
      activity_template: {
        name: "Math Exercise"
      },
      created_at: "2025-12-29T09:15:00Z",
      field_responses: [
        { field_name: "Understanding", field_type: "text", value: "Good understanding" },
        { field_name: "Completion", field_type: "text", value: "Completed 8/10 problems" }
      ]
    },
    {
      id: 3,
      student: {
        first_name: "Omar",
        last_name: "Hassan",
      },
      teacher: {
        first_name: "Emily",
        last_name: "Davis",
        profile_image: "https://via.placeholder.com/40x40/ffc107/000000?text=ED"
      },
      activity_template: {
        name: "Science Experiment"
      },
      created_at: "2025-12-28T14:45:00Z",
      field_responses: [
        { field_name: "Engagement", field_type: "text", value: "Very engaged" },
        { field_name: "Result", field_type: "text", value: "Hypothesis confirmed" }
      ]
    },
    {
      id: 4,
      student: {
        first_name: "Layla",
        last_name: "Ahmed",
      },
      teacher: {
        first_name: "David",
        last_name: "Wilson",
        profile_image: "https://via.placeholder.com/40x40/dc3545/ffffff?text=DW"
      },
      activity_template: {
        name: "Art Project"
      },
      created_at: "2025-12-28T11:20:00Z",
      field_responses: [
        { field_name: "Creativity", field_type: "text", value: "Creative work" },
        { field_name: "Materials", field_type: "text", value: "Used mixed media" }
      ]
    },
    {
      id: 5,
      student: {
        first_name: "Youssef",
        last_name: "Mahmoud",
      },
      teacher: {
        first_name: "Lisa",
        last_name: "Garcia",
        profile_image: "https://via.placeholder.com/40x40/6f42c1/ffffff?text=LG"
      },
      activity_template: {
        name: "Physical Education"
      },
      created_at: "2025-12-27T16:00:00Z",
      field_responses: [
        { field_name: "Teamwork", field_type: "text", value: "Great teamwork" },
        { field_name: "Skills", field_type: "text", value: "Improved coordination" }
      ]
    }
  ];

  const isLoading = statsLoading;

  // Extract stats from the dashboard data
  const stats = dashboardData || {};

  const overviewStats = [
    {
      key: "students",
      label: t("innerLayout.navbar.students"),
      count: stats.students_count || 0,
      color: "#007bff",
    },
    {
      key: "teachers",
      label: t("innerLayout.navbar.staff"),
      count: stats.teachers_count || 0,
      color: "#28a745",
    },
    {
      key: "classes",
      label: t("innerLayout.navbar.classes"),
      count: stats.classes_count || 0,
      color: "#ffc107",
    },
  ];

  return (
    <InnerLayout isLoading={isLoading}>
      <div className={styles.dashboard}>
        <div className={styles.overview_section}>
          <h3>{t("innerLayout.overview")}</h3>
          <div className={styles.stat_cards_container}>
            {overviewStats.map(({ key, label, count, color }) => (
              <StatCard key={key} label={label} count={count} color={color} />
            ))}
          </div>
        </div>

        <div className={styles.activities_section}>
          <h3>{t("innerLayout.recentActivities")}</h3>
          <div className={styles.activities_container}>
            {dummyActivities && dummyActivities.length > 0 ? (
              dummyActivities.map((activity: any) => (
                <ActivityPost
                  key={activity.id}
                  id={activity.id}
                  student_name={`${activity.student?.first_name || ''} ${activity.student?.last_name || ''}`.trim() || 'Unknown Student'}
                  teacher_name={`${activity.teacher?.first_name || ''} ${activity.teacher?.last_name || ''}`.trim() || 'Unknown Teacher'}
                  activity_name={activity.activity_template?.name || 'Unknown Activity'}
                  created_at={activity.created_at}
                  fields={activity.field_responses || []}
                  teacher_avatar={activity.teacher?.profile_image}
                />
              ))
            ) : (
              <div className={styles.no_activities}>
                <p>No recent activities found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </InnerLayout>
  );
};

export default Dashboard;
