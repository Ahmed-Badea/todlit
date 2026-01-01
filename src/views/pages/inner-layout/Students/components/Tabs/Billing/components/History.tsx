import React from "react";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { Table, Loading } from "../../../../../../../../design-system";
import { getInvoiceHistory, Invoice } from "../../../../../../../../services/inner-layout/invoices";
import styles from "../billing.module.scss";

interface HistoryProps {
  studentId: string;
}

const History: React.FC<HistoryProps> = ({ studentId }) => {
  const { t } = useTranslation();

  const { data: invoices, isLoading, error } = useQuery<Invoice[]>(
    ['invoiceHistory', studentId],
    () => getInvoiceHistory(studentId),
    { enabled: !!studentId }
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error || !invoices || invoices.length === 0) {
    return (
      <div className={styles.noData}>
        <p>{t("innerLayout.billing.noInvoiceHistory")}</p>
      </div>
    );
  }

  const tableData = invoices.map((invoice) => ({
    id: invoice.id,
    plan: invoice.plan_name,
    startDate: format(new Date(invoice.start_date), "MMM dd, yyyy"),
    endDate: format(new Date(invoice.end_date), "MMM dd, yyyy"),
    createdAt: format(new Date(invoice.created_at), "MMM dd, yyyy"),
    amount: `EGP ${invoice.amount}`,
    status: invoice.is_paid ? { text: 'Paid', color: '#d1fadf' } : { text: 'Unpaid', color: '#fef3c7' },
  }));

  const columns = [
    { title_en: t('innerLayout.billing.table.plan'), title_ar: t('innerLayout.billing.table.plan'), value: 'plan', dataType: 'string' as const },
    { title_en: t('innerLayout.billing.table.startDate'), title_ar: t('innerLayout.billing.table.startDate'), value: 'startDate', dataType: 'string' as const },
    { title_en: t('innerLayout.billing.table.endDate'), title_ar: t('innerLayout.billing.table.endDate'), value: 'endDate', dataType: 'string' as const },
    { title_en: t('innerLayout.billing.table.created'), title_ar: t('innerLayout.billing.table.created'), value: 'createdAt', dataType: 'string' as const },
    { title_en: t('innerLayout.billing.table.amount'), title_ar: t('innerLayout.billing.table.amount'), value: 'amount', dataType: 'string' as const },
    { 
      title_en: t('innerLayout.billing.table.status'), 
      title_ar: t('innerLayout.billing.table.status'), 
      value: 'status', 
      dataType: 'badge' as const,
      badgeConfig: {
        textField: 'text',
        colorField: 'color'
      }
    },
  ];

  return (
    <div className={styles.history}>
      <div className={styles.historyHeader}>
        <h3>{t("innerLayout.billing.invoiceHistory")}</h3>
      </div>

      <div className={styles.tableContainer}>
        <Table
          data={tableData}
          columns={columns}
          language="en"
        />
      </div>
    </div>
  );
};

export default History;