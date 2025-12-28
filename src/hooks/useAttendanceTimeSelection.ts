import { useState } from 'react';
import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { checkInAttendance, checkOutAttendance } from '../services/inner-layout/attendance';

export const useAttendanceTimeSelection = (refetch: () => void) => {
  const { t } = useTranslation();
  const [isTimePopupOpen, setIsTimePopupOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Date | null>(new Date());
  const [currentAction, setCurrentAction] = useState<'check_in' | 'check_out' | null>(null);
  const [currentRow, setCurrentRow] = useState<any>(null);

  const checkInMutation = useMutation(checkInAttendance, {
    onSuccess: () => {
      refetch();
      toast.success(t("innerLayout.attendance.checkInSuccess", { count: 1 }));
    },
    onError: (error: any) => {
      const errorMsg = error?.response?.data?.error || t("innerLayout.form.errors.somethingWentWrong");
      toast.error(errorMsg);
    }
  });

  const checkOutMutation = useMutation(checkOutAttendance, {
    onSuccess: () => {
      refetch();
      toast.success(t("innerLayout.attendance.checkOutSuccess", { count: 1 }));
    },
    onError: (error: any) => {
      const errorMsg = error?.response?.data?.error || t("innerLayout.form.errors.somethingWentWrong");
      toast.error(errorMsg);
    },
  });

  const handleTimeSelection = async (studentId: string) => {
    const teacherId = localStorage.getItem("teacher_id");
    if (!teacherId || !studentId || !selectedTime) return;

    const timeString = selectedTime.toTimeString().slice(0, 5);
    const payload = {
      student: studentId,
      teacher: teacherId,
      time: timeString
    };

    try {
      if (currentAction === 'check_in') {
        await checkInMutation.mutateAsync(payload);
      } else if (currentAction === 'check_out') {
        await checkOutMutation.mutateAsync(payload);
      }
      setIsTimePopupOpen(false);
    } catch (error) {
      // Error handling is done in mutation onError
    }
  };

  const openTimePopup = (action: 'check_in' | 'check_out', row: any) => {
    setCurrentAction(action);
    setCurrentRow(row);
    setSelectedTime(new Date());
    setIsTimePopupOpen(true);
  };

  const closeTimePopup = () => {
    setIsTimePopupOpen(false);
  };

  return {
    isTimePopupOpen,
    selectedTime,
    currentAction,
    currentRow,
    setSelectedTime,
    handleTimeSelection,
    openTimePopup,
    closeTimePopup,
  };
};