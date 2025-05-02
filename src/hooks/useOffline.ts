import { useEffect, useState } from 'react';

export function useOffline() {
  const [isOffline, setIsOffline] = useState(false);
  
  useEffect(() => {
    const handleOffline = (event: Event) => {
      if (event.type === 'offline') {
        setIsOffline(true)        
      } else {
        setIsOffline(false)
      }
    }

    window.addEventListener("offline", handleOffline);

    window.addEventListener("online", handleOffline);
    return () => {
      window.removeEventListener('offline',handleOffline);
      window.removeEventListener('online',handleOffline);
    }
  }, []);
  return isOffline;
}