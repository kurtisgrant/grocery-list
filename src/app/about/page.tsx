import { unstable_noStore as noStore } from "next/cache";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Navigation from "../_components/navigation";

export default async function About() {
  noStore();

  const session = await getServerAuthSession();

  return (
    <main className="">
      <Navigation session={session} />
      <h1 className="pb-5 text-3xl font-bold">About</h1>
    </main>
  );
}
