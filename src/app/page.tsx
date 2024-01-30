import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="">
      <Link href="/sign-in">
        <button className="bg-blue-600 hover:bg-blue-500 text-white w-[144px] font-bold text-md rounded-lg p-2 mt-4 shadow-xl cursor-pointer text-xs md:text-sm">
          Login
        </button>
      </Link>
    </main>
  );
}
