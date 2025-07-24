import { AxiosError } from "axios";

export default class ErrorHelper {
  static getErrorMessage(error: unknown) {
    if (error instanceof AxiosError) {
      return error.response?.data.message as string[];
    }
    if (error instanceof Error) return [error["message"]] as string[];
    return [];
  }
}
