'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ISignInResponse } from "src/shared/types";

export const getUserCookies = async () => {
  const role = cookies().get("role")?.value;
  const userId = cookies().get("userId")?.value;
  if(!role || !userId) redirect("/auth/sign-in");
  return {id: userId, role};
}
export const getAccessToken = async () => {
  const accessToken = await cookies().get("accessToken")?.value;
  if(!accessToken) redirect("/auth/sign-in")
  return accessToken;
}
export const signIn = async (payload: ISignInResponse) => {
  try {
    const {user, accessToken, refreshToken} = payload;
    cookies().set("userId", user.id, {
      secure: true,
      maxAge: 1 * 60 * 60 * 60,
    });
    cookies().set("role", user.role, {
      secure: true,
      maxAge: 1 * 60 * 60 * 60,
    });
    cookies().set("accessToken", accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: 15 * 60 * 60,
    });
    cookies().set("refreshToken", refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 60,
    });
    return {
      code: 200,
      data: "Successful signed in",
    }
  } catch (error) {
    return {
      code: 500,
      data: "Error during sign in",
    }
  }
}