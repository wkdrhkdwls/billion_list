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
  const onPersonClick = (id) => {
    router.push(`/person/${id}`);
  };
  return (
    <section>
      {people.length === 0
        ? "Loading..!!"
        : people.map((person) => (
            <article key={person.id} className="container">
              <img
                src={person.squareImage}
                onClick={() => onPersonClick(person.id)}
                alt="zero"
              />
              <div>
                <h2>{person.id}</h2>
              </div>
              <h4>{Math.round(person.netWorth / 1000)} billions</h4>
              <h4>{person.industries}</h4>
            </article>
          ))}
      <style jsx>{`
        section {
          background-color: gray;
          padding: 50px 10px;
          display: grid;
          gap: 50px;
          grid-template-columns: repeat(3, 1fr);
        }
        img {
          width: 80%;
          cursor: pointer;
        }
        h2 {
          font-size: 50px;
        }
      `}</style>
    </section>
  );
}
