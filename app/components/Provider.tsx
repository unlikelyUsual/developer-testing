"use client";
import { ApolloProvider } from "@apollo/client";
import { Theme } from "@radix-ui/themes";
import React from "react";
import createApolloClient from "../apolloClient";

const client = createApolloClient();

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      <Theme>{children}</Theme>
    </ApolloProvider>
  );
};
