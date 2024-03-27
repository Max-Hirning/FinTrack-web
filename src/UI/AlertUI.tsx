"use client";

import {Id, toast} from "react-toastify";

export enum IStatuses {
  info = "info",
  error = "error",
  success = "success",
  warning = "warning",
}

export function ToastifyCaller(status: IStatuses, message: string): Id {
  return toast[status](message);
}