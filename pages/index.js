import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [people, setPeople] = useState([]);
  const getPeople = async () => {
    const json = await (
      await fetch("https://billions-api.nomadcoders.workers.dev/")
    ).json();
    setPeople(json);
  };
  useEffect(() => {
    getPeople();
  }, []);
  const router = useRouter();
  const onClick = (id) => {
    router.push(`/person/${id}`);
  };
  return null;
}
