import { Context } from "@/app/api/graphql/route";
import { properties } from "@prisma/client";

const resolvers = {
  Query: {
    get_properties: async (_parent: any, args: any, ctx: Context) => {
      console.log(args);
      const properties = await ctx.prisma.properties.findMany({ take: 2 });
      return properties.map((item: properties) => ({
        ...item,
        images: JSON.parse(item.images as string),
      }));
    },
  },
};

export default resolvers;
