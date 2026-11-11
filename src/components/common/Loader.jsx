
const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="loader-container">
      <div className="loader-spinner" role="status" aria-label="Loading" />
      <p>{message}</p>
    </div>
  );
};

export default Loader;
