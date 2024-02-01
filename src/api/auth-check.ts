// pages/api/auth-check.js

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function handler() {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  } else {
    redirect("/dashboard");
  }
}
