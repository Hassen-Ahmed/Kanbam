import { useEffect, useRef } from "react";

const useClickOutside = (handler: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  const listener = (event: MouseEvent) => {
    const parentElement2 = event?.target as HTMLElement;
    if (parentElement2?.parentElement?.classList.contains("button-close")) {
      handler();
    }

    if (!ref.current || ref.current.contains(event.target as Node)) {
      return;
    }

    handler();
  };

  useEffect(() => {
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, []);

  return ref;
};

export default useClickOutside;
