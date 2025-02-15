import Link from "next/link";
import { User, Store } from "lucide-react";

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
        className="flex aspect-video h-30 flex-col gap-1 rounded-xl border border-gray-300/25 bg-white/5 p-4 shadow-violet-400/40 transition-all hover:scale-105 hover:bg-violet-400 hover:shadow-md"
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
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-24 bg-zinc-800 text-white">
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
      <div className="flex gap-8">
        <MyLink
          title="User"
          href="/teste"
          des="Join as an user and have access to an easy marketplace"
        >
          <User className="size-6" />
        </MyLink>
        <MyLink
          title="Store"
          href="/teste"
          des="Join as a store and easily setup your online store and sell right after"
        >
          <Store className="size-6" />
        </MyLink>
      </div>
    </main>
  );
}
