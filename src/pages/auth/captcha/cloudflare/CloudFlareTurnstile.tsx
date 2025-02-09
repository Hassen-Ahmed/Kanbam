import { useEffect, useRef } from "react";
import "./CloudFlareTurnstile.scss";

declare global {
  interface Window {
    onloadTurnstileCallback?: () => void;
    turnstile: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      remove: (widgetId: string) => void;
    };
  }
}

interface CaptchaProps {
  onVerify: (token: string) => void;
}

const CloudFlareTurnstile = ({ onVerify }: CaptchaProps) => {
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    window.onloadTurnstileCallback = function () {
      const sitekey = import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY;

      const widgetId = window.turnstile.render(
        "#cloudflare-turnstile-wrapper",
        {
          sitekey,
          callback: function (token) {
            onVerify(token);
          },
          theme: "light",
        }
      );

      widgetIdRef.current = widgetId;
    };

    // Dynamically load the Cloudflare Turnstile script.
    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      delete window.onloadTurnstileCallback;

      if (widgetIdRef.current) {
        window.turnstile?.remove(widgetIdRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id="cloudflare-turnstile-wrapper" aria-live="polite"></div>;
};

export default CloudFlareTurnstile;
