import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";

export default function FirstPost() {
  const router = useRouter();
  const [people, setPeople] = useState();
  const getPeople = async () => {
    if (router?.query?.id) {
      const json = await (
        await fetch(
          `https://billions-api.nomadcoders.workers.dev/person/${router.query.id}`
        )
      ).json();
      setPeople(json);
    }
  };
  useEffect(() => {
    getPeople();
  }, [router]);
  const onPersonClick = (id) => {
    router.push(`/`);
  };
  return (
    <section>
      {!people ? (
        "기다려주세요!"
      ) : (
        <>
          <article>
            <button onClick={onPersonClick}>Back</button>
            <header>
              <img src={people.squareImage} alt="zero" />
              <h1>{people.name}</h1>
            </header>

            <div>
              <h2>State :{people.state}</h2>
              <h2>City :{people.city}</h2>
              <h2>Country :{people.country}</h2>
              <h2>Industry : {people.industries}</h2>
            </div>

            <h3>{people.about}</h3>
            <h4>{people.bio}</h4>
          </article>
        </>
      )}
      <style jsx>{`
        section {
          display: flex;
          padding: 30px 20px;
        }
        div {
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
        header {
          display: flex;
          flex-direction: column;

          text-align: center;
          font-size: 48px;
        }
        img {
          width: 40%;
          display: block;
          margin: auto;
          cursor: pointer;
        }
        h2 {
          font-size: 30px;
          margin-right: auto;
        }
      `}</style>
    </section>
  );
}
