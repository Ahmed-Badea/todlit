import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { TabsGroup } from "../../../../design-system/components/Tabs/TabsGroup";
import InnerLayout from "../../../../views/layout/InnerLayout";
import { getActivities, Activity } from "../../../../services/inner-layout/activities";
import { ChevronRightIcon } from "../../../../design-system/assets/Icons";
import { ActivitySettings } from "./ActivitySettings";
import styles from "./activities.module.scss";

const Activities = () => {
  const { t } = useTranslation();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const { data: activitiesData, isLoading, error } = useQuery(
    "fetchActivities",
    getActivities
  );

  const allActivities = [
    ...(activitiesData?.enabled_activities || []),
    ...(activitiesData?.predefined_activities || [])
  ];

  useEffect(() => {
    if (allActivities.length > 0 && !selectedActivity) {
      setSelectedActivity(allActivities[0]);
    }
  }, [allActivities, selectedActivity]);

  return (
    <InnerLayout isLoading={isLoading} error={!!error} errorMessage={(error as Error)?.message}>
      <h3>{t("innerLayout.navbar.activities")}</h3>
      
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles["tabs-wrapper"]}>
            <TabsGroup
              type="line"
              orientation="vertical"
              fullWidth
              tabsProps={allActivities.map((activity) => ({
                tabLabel: (
                  <div className={styles["tab-label"]}>
                    {activity.name}
                    <span className={styles["tab-arrow"]}>{ChevronRightIcon}</span>
                  </div>
                ),
                active: selectedActivity?.id === activity.id,
                onClickHandler: () => setSelectedActivity(activity)
              }))}
            />
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles["details-wrapper"]}>
            {selectedActivity ? (
              <div>
                <div className={styles["title-header"]}>
                  <h4>{selectedActivity.name} {t("innerLayout.activities.activityDetails")}</h4>
                </div>
                                
                <ActivitySettings 
                  activityName={selectedActivity.name} 
                  activityData={selectedActivity}
                />
              </div>
            ) : (
              <div>
                <div className={styles["title-header"]}>
                  <h4>{t("innerLayout.activities.activityDetails")}</h4>
                </div>
                <p>{t("innerLayout.activities.selectActivity")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </InnerLayout>
  );
};

export default Activities;
