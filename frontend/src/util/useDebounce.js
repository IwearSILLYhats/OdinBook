import { useEffect, useState } from "react";

export default function useDebounce(callback, wait) {
  const [cb, setCb] = useState(callback);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCb(callback);
    }, wait);

    return () => {
      clearTimeout(timer);
    };
  }, [callback, wait]);
  return cb;
}
