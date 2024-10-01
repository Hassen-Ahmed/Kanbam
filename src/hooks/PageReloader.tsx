import { useEffect, useRef } from "react";

export default function PageReloader() {
  const timeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);
  const reloadStatus = useRef(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "hidden" ||
        document.hasFocus() === false
      ) {
        timeoutRef.current = setTimeout(() => {
          reloadStatus.current = true;
        }, 1000 * 60 * 2); // 1000 * 60 * 2
      } else if (document.visibilityState === "visible") {
        if (reloadStatus.current) {
          window.location.reload();
        }
        clearTimeout(timeoutRef.current!);
        timeoutRef.current = null;
        reloadStatus.current = false;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleVisibilityChange);
    window.addEventListener("blur", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleVisibilityChange);
      window.removeEventListener("blur", handleVisibilityChange);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return;
}
