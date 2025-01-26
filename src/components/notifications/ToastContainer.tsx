import { useEffect } from "react";
import { useAppDispath, useAppSelector } from "../../features/hooks";
import {
  removeToast,
  ToastMessageType,
} from "../../features/slices/kanbamSlice";
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { RiErrorWarningFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import "./ToastContainer.scss";

const styles: Record<ToastMessageType, React.CSSProperties> = {
  info: { backgroundColor: "#007BFF" },
  success: { backgroundColor: "#28A745" },
  error: { backgroundColor: "#DC3545" },
  warning: { backgroundColor: "#FFC107", color: "#000" },
};

const toastIcons = {
  success: <FaCircleCheck size={24} />,
  info: <FaInfoCircle size={24} />,
  error: <MdCancel size={24} />,
  warning: <RiErrorWarningFill size={24} />,
};

export default function ToastContainer() {
  const toasts = useAppSelector((state) => state.kanbam.toasts);
  const dispatchRdx = useAppDispath();

  useEffect(() => {
    toasts.forEach(({ id, duration }) => {
      const timer = setTimeout(() => {
        dispatchRdx(removeToast(id));
      }, duration);

      return () => clearTimeout(timer);
    });
  }, [toasts, dispatchRdx]);

  return (
    <div className="toast-container">
      {toasts.map(({ id, message, notificationType, heading }) => (
        <div key={id} className="toast" style={{ ...styles[notificationType] }}>
          <div
            className="toast-close--btn"
            aria-label="close toast notification"
            onClick={() => dispatchRdx(removeToast(id))}
          >
            <IoMdClose size={15} />
          </div>
          <h2
            aria-label="toast notification heading"
            className="toast__heading"
          >
            {heading}
          </h2>
          <div className="toast__contents">
            {toastIcons[notificationType]}
            <span aria-live="polite" aria-label="toast notification message">
              {message}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
