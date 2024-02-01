import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

import Homepage from "./homepage";

export default function dashboardPage() {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }

  return (
    <div>
      <Homepage />
    </div>
  );
}
