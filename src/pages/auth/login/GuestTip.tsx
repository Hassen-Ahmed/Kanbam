import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./GuestTip.scss";
import { useState } from "react";

export default function GuestTip() {
  const [showTips, setShowTips] = useState(false);
  return (
    <div className="login-guest">
      <span
        className="tips-toggler"
        onClick={() => setShowTips((preValue) => !preValue)}
      >
        For Guest {showTips ? <FaChevronUp /> : <FaChevronDown />}
      </span>

      {showTips ? (
        <div className="tips">
          <p>
            <span>EMAIL:</span> test@gmail.com
          </p>
          <p>
            <span>PASSWORD:</span> #Test1234
          </p>
        </div>
      ) : null}
    </div>
  );
}
