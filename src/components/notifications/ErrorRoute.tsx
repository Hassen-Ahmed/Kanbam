/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouteError } from "react-router-dom";
import "./ErrorPage.scss";
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
      </div>
    </div>
  );
}
