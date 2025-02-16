import Link from "next/link";
import { User, Store } from "lucide-react";
import cn from "@acme/utils/cn";

export default function Home() {
  function MyLink({
    href,
    title,
    children,
    des,
  }: {
    href: string;
    title: string;
    children?: React.ReactNode;
    des?: string;
  }) {
    return (
      <Link
        href={href}
        className={cn(
          "flex aspect-video h-30 flex-col gap-1 rounded-xl border p-4 transition-all",
          "border-gray-300/25 bg-white/5 shadow-violet-400/40",
          "hover:scale-105 hover:bg-violet-400 hover:shadow-md",
        )}
      >
        <div className="inline-flex items-center gap-2 text-xl font-semibold">
          {children}
          {title}
        </div>
        <p className="font-base text-sm">{des}</p>
      </Link>
    );
  }

  return (
    <>
      <header className="absolute top-0 flex h-18 w-full items-center justify-end gap-4 px-8">
        <p className="mr-2 select-none">
          Already have an <span className="text-violet-400">account</span> ?
        </p>
        <Link
          href={"/user/sign-in"}
          className={cn(
            "h-9 w-28 gap-2 rounded-full border text-base font-medium",
            "inline-flex items-center justify-center",
            "border-violet-400 transition-colors hover:bg-violet-400 hover:text-gray-50",
          )}
        >
          <User className="size-4" /> Sign In
        </Link>
        <Link
          href={"/store/sign-in"}
          className={cn(
            "h-9 w-28 gap-2 rounded-full border text-base font-medium",
            "inline-flex items-center justify-center",
            "border-violet-400 transition-colors hover:bg-violet-400 hover:text-gray-50",
          )}
        >
          <Store className="size-4" /> Sign In
        </Link>
      </header>
      <h1 className="text-center text-6xl font-bold text-gray-50">
        Use{" "}
        <span className="inline-flex -skew-x-6 bg-violet-400 text-white">
          Simple Buy
        </span>{" "}
        for <br />
        <span className="text-5xl font-semibold text-gray-100">
          Simple Store Setups
        </span>
      </h1>

      <div className="flex flex-col items-center gap-4 select-none">
        <h2 className="text-lg font-medium text-violet-200">Join us now</h2>
        <div className="flex gap-8">
          <MyLink
            title="User"
            href="/user/sign-up"
            des="Join as an user and have access to an easy marketplace"
          >
            <User className="size-6" />
          </MyLink>
          <MyLink
            title="Store"
            href="/store/sign-up"
            des="Join as a store and easily setup your online store and sell right after"
          >
            <Store className="size-6" />
          </MyLink>
        </div>
      </div>
    </>
  );
}
