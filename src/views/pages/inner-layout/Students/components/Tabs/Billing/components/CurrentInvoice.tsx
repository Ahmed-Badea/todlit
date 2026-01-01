import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { Button, Loading } from "../../../../../../../../design-system";
import { getCurrentInvoice, payInvoice, Invoice } from "../../../../../../../../services/inner-layout/invoices";
import styles from "../billing.module.scss";

interface CurrentInvoiceProps {
  studentId: string;
  onPaymentSuccess?: () => void;
}

const CurrentInvoice: React.FC<CurrentInvoiceProps> = ({ studentId, onPaymentSuccess }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data: invoice, isLoading, error } = useQuery<Invoice>(
    ['currentInvoice', studentId],
    () => getCurrentInvoice(studentId),
    { enabled: !!studentId }
  );

  const payMutation = useMutation(
    (invoiceId: number) => payInvoice(invoiceId),
    {
      onSuccess: () => {
        toast.success(t("innerLayout.billing.invoicePaidSuccess"));
        queryClient.invalidateQueries(['currentInvoice', studentId]);
        queryClient.invalidateQueries(['invoiceHistory', studentId]);
        onPaymentSuccess?.();
      },
      onError: () => {
        toast.error(t("innerLayout.billing.payInvoiceError"));
      },
    }
  );

  const handlePayInvoice = () => {
    if (invoice) {
      payMutation.mutate(invoice.id);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error || !invoice) {
    return (
      <div className={styles.noData}>
        <p>{t("innerLayout.billing.noCurrentInvoice")}</p>
      </div>
    );
  }

  const formattedStartDate = format(new Date(invoice.start_date), "MMM dd, yyyy");
  const formattedEndDate = format(new Date(invoice.end_date), "MMM dd, yyyy");
  const formattedCreatedDate = format(new Date(invoice.created_at), "MMM dd, yyyy 'at' HH:mm");

  return (
    <div className={styles.currentInvoice}>
      <div className={styles.invoiceCard}>
        <div className={styles.invoiceHeader}>
          <h3>{t("innerLayout.billing.currentInvoice")}</h3>
          <span className={`${styles.status} ${invoice.is_paid ? styles.paid : styles.unpaid}`}>
            {invoice.is_paid ? t("innerLayout.billing.paid") : t("innerLayout.billing.unpaid")}
          </span>
        </div>

        <div className={styles.invoiceDetails}>
          <div className={styles.detailRow}>
            <span className={styles.label}>{t("innerLayout.billing.plan")}</span>
            <span className={styles.value}>{invoice.plan_name}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.label}>{t("innerLayout.billing.startDate")}</span>
            <span className={styles.value}>{formattedStartDate}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.label}>{t("innerLayout.billing.endDate")}</span>
            <span className={styles.value}>{formattedEndDate}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.label}>{t("innerLayout.billing.invoiceCreated")}</span>
            <span className={styles.value}>{formattedCreatedDate}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.label}>{t("innerLayout.billing.amount")}</span>
            <span className={styles.amount}>EGP {invoice.amount}</span>
          </div>
        </div>

        {!invoice.is_paid && (
          <div className={styles.payButton}>
            <Button
              onClickHandler={handlePayInvoice}
              loading={payMutation.isLoading}
              variant="contained"
              text={t("innerLayout.billing.payInvoice")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentInvoice;