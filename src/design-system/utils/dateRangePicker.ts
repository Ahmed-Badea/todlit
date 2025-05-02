import { DateRangePicker } from "rsuite";
import { differenceInDays, subDays, subYears } from "date-fns";

const { combine, allowedDays, after, before } = DateRangePicker;

export const TODAY = new Date();
export const YESTERDAY = subDays(TODAY, 1);
export const MIN_DATE = subYears(YESTERDAY, 2);

export const getDaysBetween = (startDate: Date, endDate: Date) => {
  return Math.abs(differenceInDays(startDate, endDate)) + 1;
};

export const getDisabledDates = (startDate?: Date, endDate?: Date, minDate?: Date, disabledAfter?: 'start' | 'end') => {
  return startDate && endDate && combine(
    combine(
      allowedDays(getDaysBetween(startDate, endDate)),
      after(disabledAfter === 'start' ? startDate : endDate),
    ),
    before(minDate || MIN_DATE)
  )
};

export function formatDateRange(date: Date, lang: 'en' | 'ar' = 'en') {
  const options: any = { month: 'short', day: 'numeric', year: 'numeric' };

  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString(lang, options);
};