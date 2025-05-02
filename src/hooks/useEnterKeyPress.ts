import { useEffect } from 'react';

export const useEnterKeyPress = (submitBtnId: string) => {

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent): void {
      const submitBtn: HTMLButtonElement | null = document.getElementById(submitBtnId) as HTMLButtonElement;

      if (event.key === 'Enter' && !submitBtn?.disabled) {
        submitBtn && submitBtn.click();
      }
    }

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
}