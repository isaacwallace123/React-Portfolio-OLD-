import "./Error.css";

export default function Error({ Problem }) {
  const defaultMessage = "ERROR 404 NOT FOUND";

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{Problem || defaultMessage}</i>
      </p>
    </div>
  );
}