import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import InnerLayout from "../../../../views/layout/InnerLayout";
import StatCard from "../../../../components/StatCard";
import ActivityPost from "../../../../components/ActivityPost";
import { getDashboardView } from "../../../../services/inner-layout/dashboard";
import { getTeacherActivityPosts } from "../../../../services/inner-layout/activityPosts";
import styles from "./dashboard.module.scss";

const Dashboard = () => {
  const { t } = useTranslation();

  const teacherIdStr = localStorage.getItem("teacher_id");
  const teacherId = teacherIdStr ? parseInt(teacherIdStr) : null;

  const { data: dashboardData, isLoading: statsLoading } = useQuery(
    "dashboardView",
    getDashboardView
  );

  const { data: allPosts = [], isLoading: postsLoading } = useQuery(
    ["activityPosts", teacherId],
    () => getTeacherActivityPosts(teacherId!),
    {
      enabled: !!teacherId,
      staleTime: 5 * 60 * 1000,
    }
  );

  // const recentPosts = allPosts.slice(0, 5);
  const recentPosts = allPosts;
  const isLoading = statsLoading || postsLoading;
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
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <ActivityPost
                  key={post.id}
                  performed_at={post.performed_at}
                  notes={post.notes}
                  field_responses={post.field_responses}
                  media={post.media}
                />
              ))
            ) : (
              <div className={styles.no_activities}>
                <p>{t("innerLayout.noData")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </InnerLayout>
  );
};

export default Dashboard;
