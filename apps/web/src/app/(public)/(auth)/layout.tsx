import cn from "@acme/utils/cn";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Link
        href={"/"}
        className={cn(
          "absolute top-5 left-5",
          "group size-10 rounded-full border-2 text-sm font-medium transition-all ease-in-out",
          "inline-flex items-center justify-center",
          "border-indigo-400 text-indigo-400",
          "hover:w-24 hover:gap-2 hover:px-2",
          "hover:bg-indigo-400 hover:text-white hover:shadow-lg hover:shadow-indigo-400/20",
        )}
      >
        <ArrowLeft className="size-5" />
        <p className="hidden group-hover:inline">Return</p>
      </Link>
      <div
        className={cn(
          "min-h-80 w-105 rounded-2xl border border-gray-300/25 bg-white/5 p-4",
        )}
      >
        {children}
      </div>
    </>
  );
}
