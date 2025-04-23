import { useEffect, useRef, memo } from 'react';

interface SpecialCodeListenerProps {
  onTrigger: () => void;
}

const SpecialCodeListener = ({ onTrigger }: SpecialCodeListenerProps) => {
  const codeRef = useRef<string[]>([]);

  const specialCode = 'jhutest';

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      codeRef.current.push(event.key);

      if (codeRef.current.length > specialCode.length) {
        codeRef.current.shift();
      }

      if (codeRef.current.join('').toLowerCase() === specialCode) {
        console.log('triggered oncall');
        codeRef.current = [];
        onTrigger?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onTrigger]);

  return null;
};

export default memo(SpecialCodeListener);
