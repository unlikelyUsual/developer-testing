import { prisma } from "@/lib/prisma";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client/extension";
import { NextRequest } from "next/server";
import resolvers from "../../../lib/graphql/resolver";
import typeDefs from "../../../lib/graphql/schema";

export type Context = {
  prisma: PrismaClient;
};

const apolloServer = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(
  apolloServer as any,
  {
    context: async (req, res) => ({ req, res, prisma }),
  }
);

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
