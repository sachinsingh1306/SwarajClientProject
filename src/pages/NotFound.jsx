
function NotFound({ navigate }) {
  return (
    <section className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          Sorry, the page you're looking for doesn't exist
          or may have been moved.
        </p>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/")}
        >
          Return to Home
        </button>
      </div>
    </section>
  );
}

export default NotFound;
