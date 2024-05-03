/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouteError } from "react-router-dom";

export default function ErrorPage({ text }: { text: string }) {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="error-route">
      <h1>Oops! </h1>
      <p>Sorry, an unexpected error has occurred on {text}.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
