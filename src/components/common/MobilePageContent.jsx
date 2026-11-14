function MobilePageContent({ eyebrow, title, intro, points }) {
  return (
    <section className="mobile-page-content" aria-label={title}>
      <div className="container">
        <span className="section-subtitle">{eyebrow}</span>
        <h2>{title}</h2>
        <p className="mobile-page-intro">{intro}</p>
        <div className="mobile-page-points">
          {points.map((point) => (
            <article key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MobilePageContent;
