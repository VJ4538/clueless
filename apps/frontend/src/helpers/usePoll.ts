import { useState, useRef, useCallback, useEffect } from 'react';

const usePoll = (
  callback: () => Promise<void> | void,
  interval: number = 5000
) => {
  const [isPolling, setIsPolling] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const startPolling = useCallback(() => {
    setIsPolling(true);
  }, []);

  const stopPolling = useCallback(() => {
    setIsPolling(false);
  }, []);

  useEffect(() => {
    const poll = async () => {
      if (!isPolling) return;

      try {
        await callback();
      } catch (error) {
        console.error('Polling error:', error);
      }

      timeoutRef.current = setTimeout(poll, interval);
    };

    poll();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [callback, interval, isPolling]);

  return { isPolling, startPolling, stopPolling };
};

export default usePoll;
