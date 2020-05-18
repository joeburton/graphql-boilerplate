const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const developers = [
  {
    name: "Joe Burton",
    skills: "JavaScript, React, HTML, CSS",
  },
  {
    name: "James Brown",
    skills: "Java, MYSQL",
  },
  {
    name: "Bill Smith",
    skills: "PHP, MYSQL, HTML",
  },
];

const technologies = [
  { type: "JavaScript" },
  { type: "React" },
  { type: "HTML" },
  { type: "CSS" },
  { type: "Java" },
  { type: "MYSQL" },
  { type: "PHP" },
];

const typeDefDevelopers = `
  extend type Query {
    developers: [Developer]
  }

  type Developer {
    name: String
    skills: String
  }
`;

const typeDefTechnologies = `
  extend type Query {
    technologies: [Technologies]
  }

  type Technologies {
    type: String
  }
`;

const typeDef = `
  type Query
`;

const typeDefs = [typeDef, typeDefDevelopers, typeDefTechnologies];

// The resolvers
const developersResolver = {
  Query: { developers: () => developers },
};

const technologiesResolver = {
  Query: { technologies: () => technologies },
};

const resolvers = [developersResolver, technologiesResolver];

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// Test data - technologies
app.get("/technologies", function (req, res) {
  res.send(JSON.stringify(technologies));
});

// GraphiQL, a visual editor for queries
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// Start the server
app.listen(5000, () => {
  console.log("Go to http://localhost:5000/graphiql to run queries!");
});
