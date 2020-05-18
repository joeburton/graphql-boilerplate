import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import DisplayData from "./DisplayData";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <h1>React + Apollo Client</h1>
      <p>
        <a
          href="http://localhost:5000/graphiql"
          target="_blank"
          rel="noopener noreferrer"
        >
          Run GraphiQL queries here
        </a>
      </p>
      <DisplayData />
    </ApolloProvider>
  );
}

export default App;
