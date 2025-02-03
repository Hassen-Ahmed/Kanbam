import { useState } from "react";
import usePosts from "../../utils/api/usePosts";
import { Link } from "react-router-dom";
import { toasterHandler } from "../../utils/toaster";
import { useAppDispath } from "../../features/hooks";
import { logger } from "../../utils/logger";
import "./CheckoutForm.scss";

function CheckoutForm() {
  const dispatchRdx = useAppDispath();
  const { postDonationCheckout } = usePosts();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const donationAmounts = [5, 10, 15, 20];

  const handleDonation = async () => {
    if (selectedAmount === null) {
      toasterHandler({
        dispathFun: dispatchRdx,
        message: "Please select an amount to donate.",
        notificationType: "info",
        duration: 5000,
      });
      return;
    }

    if (selectedAmount < 5 || selectedAmount > 20) {
      toasterHandler({
        dispathFun: dispatchRdx,
        message: "Please select an amount between $5 and $20.",
        notificationType: "error",
        duration: 5000,
      });
      return;
    }
    setIsLoading(true);

    try {
      const data = await postDonationCheckout(selectedAmount);
      window.location.href = data.url;
    } catch (err) {
      logger("error", `Donation checkout error:, ${err}`);
      toasterHandler({
        dispathFun: dispatchRdx,
        message: "An error occurred. Please try again.",
        notificationType: "error",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="donation-wrapper">
      <div className="donation">
        <h2 className="title">Buy Me a Coffee</h2>
        <p className="subtitle">Support me by buying a coffee or lunch!</p>
        <div className="donation-options">
          {donationAmounts.map((amount) => (
            <button
              key={amount}
              className={`donation-button ${
                selectedAmount === amount ? "selected" : ""
              }`}
              onClick={() => setSelectedAmount(amount)}
              aria-live="polite"
              aria-label="Amount button"
              aria-pressed={selectedAmount === amount}
            >
              ${amount}
            </button>
          ))}
        </div>
        <button
          className="donate-btn"
          onClick={handleDonation}
          disabled={isLoading}
          aria-live="polite"
          aria-label=" Support Me button"
        >
          {isLoading ? "Processing..." : "Support Me"}
        </button>
        <p className="policy-text">
          By proceeding, you agree to our
          <Link
            to={"/legal/terms-of-service"}
            target="_blank"
            aria-label="Terms of Service link"
          >
            Terms of Service
          </Link>
          and
          <Link
            to={"/legal/privacy-policy"}
            target="_blank"
            aria-label="Privacy Policy link"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}

export default CheckoutForm;
