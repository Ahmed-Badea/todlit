import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TabsGroup } from "../../../../../../../design-system/components/Tabs/TabsGroup";
import CurrentInvoice from "./components/CurrentInvoice";
import History from "./components/History";
import styles from "./billing.module.scss";

const Billing = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState(0);

  const tabsProps = [
    { tabLabel: t("innerLayout.billing.tabs.currentInvoice"), active: activeTab === 0, onClickHandler: () => setActiveTab(0) },
    { tabLabel: t("innerLayout.billing.tabs.history"), active: activeTab === 1, onClickHandler: () => setActiveTab(1) },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <CurrentInvoice studentId={id || ''} onPaymentSuccess={() => setTimeout(() => setActiveTab(1), 3000)} />;
      case 1:
        return <History studentId={id || ''} />;
      default:
        return <CurrentInvoice studentId={id || ''} onPaymentSuccess={() => setTimeout(() => setActiveTab(1), 3000)} />;
    }
  };

  return (
    <div className={styles.billing}>
      <TabsGroup type="line" orientation="horizontal" tabsProps={tabsProps} />
      <div className={styles.tabContent}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Billing;
