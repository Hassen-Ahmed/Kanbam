/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouteError } from "react-router-dom";
import "./ErrorPage.scss";
import { Link } from "react-router-dom";
export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="error-route">
      <div className="contents">
        <h1>Oops! </h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>404 {error.statusText || error.message}</i>
        </p>
        <div className="home-btn">
          <Link to={"/"}>Home</Link>
        </div>
      </div>
    </div>
  );
}
