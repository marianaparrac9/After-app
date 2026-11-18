import { isAxiosError } from "axios";

export const getErrorMessage = (error: unknown, fallback = "Something went wrong") => {
  if (isAxiosError(error)) {
    if (!error.response) return "We could not reach the After API";
    return error.response.data?.message || fallback;
  }

  if (error instanceof Error && error.message) return error.message;
  return fallback;
};
