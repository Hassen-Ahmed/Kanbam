import { Link } from "react-router-dom";
import "./Legal.scss";

const TermsOfService = () => {
  return (
    <div className="legal-container">
      <h1>Terms of Service</h1>
      <p>
        <strong>Effective Date:</strong> {new Date("2024/05/01").toDateString()}
      </p>
      <p>
        <strong>Last Updated:</strong> {new Date().toDateString()}
      </p>

      <p>
        Welcome to <strong>Kanbam</strong>. These Terms of Service ("Terms")
        govern your use of our website and services. By using our website, you
        agree to these Terms.
      </p>

      <h2>1. Who We Are</h2>
      <ul>
        <li>
          <strong>Website:</strong> https://kanbam.netlify.app/
        </li>
        <li>
          <strong>Contact Email:</strong> hassenbest21@gmail.com
        </li>
        <li>
          <strong>Operator:</strong> Kanbam Dev.
        </li>
      </ul>

      <h2>2. Donations & Payments</h2>
      <p>
        Donations are <strong>voluntary</strong> and{" "}
        <strong>non-refundable</strong> unless required by law. Payments are
        processed securely via <strong>Stripe</strong>. We do{" "}
        <strong>not</strong> store payment details.
      </p>
      <p>
        Stripe’s terms apply:{" "}
        <a
          href="https://stripe.com/gb/legal"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://stripe.com/gb/legal
        </a>
      </p>

      <h2>3. User Conduct</h2>
      <p>You agree to:</p>
      <ul>
        <li>Use the website only for lawful purposes.</li>
        <li>Provide accurate payment details when making a donation.</li>
      </ul>
      <p>
        <strong>You must not:</strong>
      </p>
      <ul>
        <li>Attempt to hack, disrupt, or harm the website.</li>
        <li>Use the website for fraudulent activities.</li>
      </ul>

      <h2>4. Privacy & Data Protection</h2>
      <p>
        We collect and process personal data as described in our{" "}
        <Link to={"/legal/privacy-policy"}>Privacy Policy</Link>.
      </p>

      <h2>5. Contact Us</h2>
      <p>
        <strong>Email:</strong> hassenbest21@gmail.com
      </p>
      <p>
        <strong>
          Website:{" "}
          <a
            href=" https://kanbam.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://kanbam.netlify.app/
          </a>{" "}
        </strong>
      </p>
    </div>
  );
};

export default TermsOfService;
