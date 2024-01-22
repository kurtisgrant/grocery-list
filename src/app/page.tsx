import { unstable_noStore as noStore } from "next/cache";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Navigation from "./_components/navigation";
import { Card, CardContent } from "~/components/ui/card";
import type { Session } from "next-auth";

export default async function Home() {
  noStore();

  const session: Session | null = await getServerAuthSession();
  const groceryItems = session ? await api.groceryItem.getAll.query() : null;

  return (
    <main className="">
      <Navigation session={session} />
      <div className="p-8">
        <h1 className="pb-5 pt-3 text-3xl font-bold">Grocery List</h1>
        {session && (
          <Card>
            <CardContent>
              {groceryItems?.map((item) => (
                <div key={item.id}>{item.name}</div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
