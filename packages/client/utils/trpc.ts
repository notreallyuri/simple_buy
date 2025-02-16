// client/utils/trpc.ts
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@acme/server";
import { httpBatchLink } from "@trpc/client";
import { getUrl } from "./url";

const url = getUrl();

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${url}/trpc`,
    }),
  ],
});