import { Button } from "@/components/ui/button";
import { Users } from "@/components/Users";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const skip = (page - 1) * 10;

  const { isPending, error, data } = useQuery({
    queryKey: ["users", page],
    queryFn: () =>
      fetch(`https://dummyjson.com/users?limit=10&skip=${skip}`).then((res) =>
        res.json()
      ),
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }
  return (
    <div className="m-4 flex flex-col gap-4">
      <h1 className="text-center font-bold">Users</h1>
      {data && <Users data={data.users} />}
      <div className="flex justify-end align-middle gap-5">
        <Button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span>Page {page}</span>
        <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>
      </div>
    </div>
  );
}
