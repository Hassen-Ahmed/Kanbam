import { BiSolidError } from "react-icons/bi";
import "./ErrorMessage.scss";

interface IErrorMessage {
  message: string;
  statusCode: number;
}

export default function ErrorMessage({ message, statusCode }: IErrorMessage) {
  const color = statusCode == 404 ? "yellow" : "#e3342e";

  return (
    <div className="error-message">
      <div className="logo">
        <BiSolidError size={50} color={color} />
      </div>
      <h1>Sorry, something went wrong!</h1>
      <div className="errors" style={{ color: color }}>
        <h3 className="message">{message}</h3>
        <h1 className="status-code">{statusCode}</h1>
      </div>
    </div>
  );
}
