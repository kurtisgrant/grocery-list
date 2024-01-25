"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import { api } from "~/trpc/react";

export function CreateItem() {
  const router = useRouter();
  const [name, setName] = useState("");

  const createPost = api.groceryItem.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ name });
      }}
      className="flex flex-col gap-2 py-4"
    >
      <Label htmlFor="new-item">Add Item</Label>
      <Input
        id="new-item"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button type="submit" disabled={createPost.isLoading}>
        {createPost.isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
