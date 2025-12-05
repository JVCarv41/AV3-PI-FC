import { Link } from "react-router-dom";
import "./ErrorPage.css";

function ErrorPage() {
  return (
    <div className="error-page">
      <div className="error-content">
        <h1 className="error-title">404</h1>
        <h2 className="error-subtitle">Page Not Found</h2>
        <p className="error-message">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="error-link">
          ⬅ Back to Homepage
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;