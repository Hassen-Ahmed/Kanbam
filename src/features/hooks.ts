import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

// Pre defined hooks
export const useAppDispath = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
