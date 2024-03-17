"use client";

import {toast} from "react-toastify";

export enum IStatuses {
  info = "info",
  error = "error",
  success = "success",
  warning = "warning",
}

export function ToastifyCaller(status: IStatuses, message: string) {
  return toast[status](message);
}