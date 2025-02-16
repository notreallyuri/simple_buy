import Link from "next/link";
import { User, Store } from "lucide-react";
import { inter } from "@/app/layout";
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
          "flex aspect-video h-36 flex-col gap-1 rounded-xl border p-4 transition-all",
          "border-gray-300/25 bg-white/5 shadow-indigo-400/15",
          "hover:scale-105 hover:bg-indigo-400 hover:shadow-lg",
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
        <Link
          href={"/user/sign-in"}
          className={cn(
            "h-9 w-28 gap-2 rounded-full border text-base font-medium",
            "inline-flex items-center justify-center",
            "border-indigo-400 transition-colors hover:bg-indigo-400 hover:text-gray-50",
          )}
        >
          <User className="size-4" /> Sign In
        </Link>
        <Link
          href={"/store/sign-in"}
          className={cn(
            "h-9 w-28 gap-2 rounded-full border text-base font-medium",
            "inline-flex items-center justify-center",
            "border-indigo-400 transition-colors hover:bg-indigo-400 hover:text-gray-50",
          )}
        >
          <Store className="size-4" /> Sign In
        </Link>
      </header>
      <h1
        className={cn(
          "text-center text-8xl font-bold text-gray-50",
          inter.className,
        )}
      >
        Use{" "}
        <span className="inline-flex -skew-x-6 bg-indigo-400 px-3 text-white">
          Simple Buy
        </span>{" "}
        for <br />
        <span className="text-6xl font-semibold text-gray-100">
          Simple Store Setups
        </span>
      </h1>

      <div className="flex flex-col items-center gap-4 select-none">
        <h2 className="text-lg font-medium text-indigo-100">
          Get Started for Free
        </h2>
        <div className="flex gap-8">
          <MyLink
            title="User"
            href="/user/sign-up"
            des="Browse products, add to cart, secure checkout with Stripe integration."
          >
            <User className="size-6" />
          </MyLink>
          <MyLink
            title="Store"
            href="/store/sign-up"
            des="Create product listings, manage inventory, track sales, view analytics dashboard."
          >
            <Store className="size-6" />
          </MyLink>
        </div>
      </div>
    </>
  );
}
