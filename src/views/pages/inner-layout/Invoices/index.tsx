import { useState } from "react";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { useClassesStore } from "../../../../store/classes";
import {
  Table,
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownMenuItem,
} from "../../../../design-system";
import DatePicker from "../../../../components/DatePicker";
import { getInvoices } from "../../../../services/inner-layout/invoices";
import InnerLayout from "../../../layout/InnerLayout";
import columns from "./invoicesTableStruc.json";
import { Language } from "../../../../types";
import styles from "./invoices.module.scss";

const Invoices = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;
  const { classes } = useClassesStore();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [classFilter, setClassFilter] = useState("");

  const yearFilter = selectedDate ? String(selectedDate.getFullYear()) : "";
  const monthFilter = selectedDate ? String(selectedDate.getMonth() + 1) : "";

  const {
    data: invoiceData,
    error,
    isLoading,
    isFetching,
  } = useQuery(["fetchInvoices", yearFilter, monthFilter, classFilter], () => {
    return getInvoices({
      year: yearFilter,
      month: monthFilter,
      classroom_id: classFilter,
    });
  });

  return (
    <InnerLayout
      isLoading={isLoading || isFetching}
      error={!!error}
      errorMessage={(error as Error)?.message}
    >
      <div className={styles.header}>
        <h3>{t("innerLayout.navbar.invoices")}</h3>
        <div className={styles.filters_container}>
          <DatePicker
            type="month"
            value={selectedDate}
            onChange={setSelectedDate}
            placeholder={t("innerLayout.invoices.filters.date")}
            style={{ width: 220 }}
          />

          <Dropdown>
            <DropdownButton text={classFilter ? classes.find(c => c.id === classFilter)?.name : t("innerLayout.invoices.filters.classroom")} />
            <DropdownMenu>
              <DropdownMenuItem text={t("innerLayout.invoices.filters.allClasses")} onClickHandler={() => setClassFilter("")} selected={classFilter === ""} />
              {classes?.map((cls) => (
                <DropdownMenuItem key={cls.id} text={cls.name} onClickHandler={() => setClassFilter(cls.id)} selected={classFilter === cls.id} />
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <Table
        language={lang}
        columns={columns.map((col) => ({ ...col, dataType: col.dataType as any }))}
        data={invoiceData}
      />
    </InnerLayout>
  );
};
export default Invoices;
