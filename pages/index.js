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
  return (
    <section>
      {people.length === 0
        ? "Loading..!!"
        : people.map((person) => (
            <article key={person.id} className="container">
              <img src={person.squareImage} />
              <div>{person.id}</div>
            </article>
          ))}
      <style jsx>{`
        section {
          padding: 50px 0px;
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }
        }
      `}</style>
    </section>
  );
}
