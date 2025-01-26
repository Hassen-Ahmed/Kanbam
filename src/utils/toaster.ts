import {
  addToast,
  Toast,
  ToastMessageType,
} from "../features/slices/kanbamSlice";
import { AppDispatch } from "../store/store";

export interface IToastParams {
  dispathFun: AppDispatch;
  message?: string | null;
  heading?: string | null;
  notificationType?: ToastMessageType;
  duration?: number;
}

export const toasterHandler = (toastParams: IToastParams) => {
  const toast: Toast = {
    message: toastParams.message ?? null,
    heading: toastParams.heading ?? null,
    notificationType: toastParams.notificationType ?? "success",
    duration: toastParams.duration ?? 5 * 60 * 1000,
  };

  toastParams.dispathFun(addToast(toast));
};
