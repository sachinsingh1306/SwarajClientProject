
import { useApp } from "../context/AppContext";

function ThankYou({ navigate }) {
  const { settings } = useApp();

  return (
    <section className="thank-you-page">
      <div className="thank-you-card">
        <div className="thank-you-icon">✓</div>

        <span className="section-subtitle">
          FRONTEND-ONLY CONTACT
        </span>

        <h1>One last step</h1>

        <p>
          This website does not send or save enquiries automatically. To contact {settings.siteName}, prepare your message on the Contact page and send it using WhatsApp or email.
        </p>

        <p>
          Your enquiry is only delivered after you press Send in your chosen app.
        </p>

        <div className="thank-you-actions">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/contact")}
          >
            Go to Contact
          </button>

          <button
            className="btn btn-outline"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </section>
  );
}

export default ThankYou;
