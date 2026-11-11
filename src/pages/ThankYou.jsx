
import { useApp } from "../context/AppContext";

function ThankYou({ navigate }) {
  const { settings } = useApp();

  return (
    <section className="thank-you-page">
      <div className="thank-you-card">
        <div className="thank-you-icon">✓</div>

        <span className="section-subtitle">
          ENQUIRY RECEIVED
        </span>

        <h1>Thank You!</h1>

        <p>
          Your enquiry has been saved successfully.
          Thank you for contacting {settings.siteName}.
        </p>

        <p>
          We appreciate your interest and look forward
          to discussing your photography requirements.
        </p>

        <div className="thank-you-actions">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>

          <button
            className="btn btn-outline"
            onClick={() => navigate("/portfolio")}
          >
            Explore Portfolio
          </button>
        </div>
      </div>
    </section>
  );
}

export default ThankYou;
