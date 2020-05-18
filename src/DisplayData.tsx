import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const GET_TECHNOLOGIES = gql`
  query {
    technologies {
      type
    }
  }
`;

const GET_DEVELOPERS = gql`
  query {
    developers {
      name
      skills
    }
  }
`;

const DisplayDevelopers = () => {
  const { loading, error, data } = useQuery(GET_DEVELOPERS, {});

  console.log("Developers: ", loading, error, data);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error loading developers!</p>;

  return (
    <>
      <h2>Developers</h2>
      <ul>
        {data.developers.map(({ name, skills }: any) => (
          <li key={name}>{`${name}, ${skills}`}</li>
        ))}
      </ul>
    </>
  );
};

const DisplayTechnologies = () => {
  const { loading, error, data } = useQuery(GET_TECHNOLOGIES, {});

  console.log("Technologies: ", loading, error, data);

  if (loading) return <p>Loading Technologies...</p>;

  if (error) return <p>Error loading technologies!</p>;

  return (
    <>
      <h2>Technologies</h2>
      <ul>
        {data.technologies.map(({ type }: any) => (
          <li key={type}>{type}</li>
        ))}
      </ul>
    </>
  );
};

function DisplayData() {
  return (
    <>
      <DisplayDevelopers />
      <DisplayTechnologies />
    </>
  );
}

export default DisplayData;
