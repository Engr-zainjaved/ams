"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  // some server stuff before wanting to logout user
  await signOut();
};
