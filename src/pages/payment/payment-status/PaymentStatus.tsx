import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import Confetti from "react-confetti";
import { useSearchParams } from "react-router-dom";
import "./PaymentStatus.scss";

export default function PaymentStatus() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [searchParams] = useSearchParams();

  const paymentStatus = searchParams.get("status") as "success" | "failed";

  const statusContents = {
    success: {
      heading: "Thank You for Your Support! 💖",
      para: "Your generosity makes a difference! We truly appreciate your support. 🌍✨",
    },
    failed: {
      heading: "Oops! Payment Failed 😢",
      para: "Something went wrong. But don’t worry, you can try again! 🔄",
    },
  };

  useEffect(() => {
    if (paymentStatus === "success") setShowConfetti(true);

    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, [paymentStatus]);

  const navigateToApp = () => {
    const newTab = window.open("/kanbam/w", "_blank");

    if (newTab) {
      window.close();
    }
  };

  return (
    <div className="payment-status-wrapper">
      <div className="payment-status">
        <div className="header">
          {showConfetti && <Confetti />}
          {paymentStatus == "success" ? (
            <CheckCircle color="green" />
          ) : (
            <XCircle color="#925555" />
          )}
          <h1
            className="heading"
            style={{ color: `${paymentStatus === "failed" ? "#925555" : ""}` }}
          >
            {statusContents[paymentStatus].heading}
          </h1>
        </div>
        <p>{statusContents[paymentStatus].para}</p>

        <button className="btn" onClick={navigateToApp}>
          Return to App
        </button>
      </div>
    </div>
  );
}
