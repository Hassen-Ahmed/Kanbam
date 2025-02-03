import "./Legal.scss";
const PrivacyPolicy = () => {
  return (
    <div className="legal-container">
      <h1>Privacy Policy</h1>
      <p>
        <strong>Effective Date:</strong> {new Date("2024/05/01").toDateString()}
      </p>
      <p>
        <strong>Last Updated:</strong> {new Date().toDateString()}
      </p>
      <p>
        <strong>Kanbam</strong> values your privacy. This Privacy Policy
        explains how we collect, use, store, and protect your personal data when
        you use our website and make donations.
      </p>
      <h2>1. What Data We Collect</h2>
      <p>We collect and process the following personal data:</p>
      <ul>
        <li>
          <strong>Donation Information:</strong> Name, email address, and
          donation amount.
        </li>
        <li>
          <strong>Payment Details:</strong> Handled securely by
          <strong>Stripe</strong>. We do <strong>not</strong> store card
          details.
        </li>
        <li>
          <strong>Website Usage Data:</strong> IP address, browser type, and
          analytics (via cookies).
        </li>
      </ul>
      <h2>2. How We Use Your Data</h2>
      <ul>
        <li>
          <strong>Processing donations</strong> (contractual necessity).
        </li>
        <li>
          <strong>Sending email receipts</strong> (legitimate interest).
        </li>
        <li>
          <strong>Fraud prevention</strong> (legal obligation).
        </li>
        <li>
          <strong>Website analytics</strong> (with consent via cookies).
        </li>
      </ul>
      <h2>3. Your Rights Under UK GDPR</h2>
      <p>You have the right to:</p>
      <ul>
        <li>
          Access, correct, or delete your data (e.g., your name and email).
        </li>
        <li>Withdraw consent (e.g., request data deletion).</li>
        <li>
          Lodge a complaint with the Information Commissioner's Office (ICO) if
          you believe your data is misused.
        </li>
      </ul>
      <h2>4. Third-Party Services</h2>
      <ul>
        <li>
          <p>
            Payments are processed by <strong>Stripe</strong>. Their privacy
            policy:{" "}
            <a
              href="https://stripe.com/gb/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://stripe.com/gb/privacy
            </a>
          </p>
        </li>
      </ul>

      <h2>5. Contact Us</h2>
      <ul>
        <li>
          We do not use tracking cookies or analytics on our donation page.
        </li>
        <li>
          If we introduce cookies in the future, we will update this policy.
        </li>
      </ul>

      <h2>6. Changes to This Policy</h2>
      <ul>
        <li>
          We may update this policy as needed. Any changes will be posted here.
        </li>
        <li>
          If you have questions, please contact us:
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
              </a>
            </strong>
          </p>
        </li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;
