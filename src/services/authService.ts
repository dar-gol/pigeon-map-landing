import CookieHelper from "@/lib/CookieHelper";
import { authPatch, post } from "./BaseService";
import { RegisterFormProps } from "@/models/RegisterFormData";

export interface LoginData {
  access_token: string;
}

export interface LoginProps {
  username: string;
  password: string;
}

export const signIn = async (data: LoginProps) => {
  const result = await post<LoginData>("auth/login", data);
  CookieHelper.token.set(result.data.access_token);
  return result.data;
};

export const googleSignIn = async (data: { token: string }) => {
  const result = await post<LoginData>("auth/google-login", data);
  CookieHelper.token.set(result.data.access_token);
  return result.data;
};

export const acceptPlanner = (token: string) => {
  return authPatch(`users/accept-planner`, { token });
};

export const signUp = (data: RegisterFormProps) => {
  if (!data.phoneNumber) data.phoneNumber = undefined;
  return post("auth/register", data);
};

export const resendConfirmationEmail = async (email: string) => {
  await post(`auth/email/resend`, { email });
};

export const confirmEmail = async (token: string) => {
  await post(`auth/email`, { token });
};
