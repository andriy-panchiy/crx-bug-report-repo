import { useEffect } from 'react';

export const useOutsideClickDetector = (ref: React.RefObject<HTMLElement>, callback: (e: MouseEvent) => void) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback(e);
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, callback]);
};

export default useOutsideClickDetector;
