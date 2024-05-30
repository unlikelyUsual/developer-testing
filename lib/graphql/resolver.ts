import { Context } from "@/app/api/graphql/route";
import { properties } from "@prisma/client";

const resolvers = {
  Query: {
    get_properties: async (_parent: any, args: any, ctx: Context) => {
      const {
        type,
        minPrice,
        maxPrice,
        minBedrooms,
        maxBedrooms,
        minArea,
        maxArea,
        skip = 0,
        count = 10,
      } = args;

      const where = {
        type: type || undefined,
        price: {
          gte: minPrice || undefined,
          lte: maxPrice || undefined,
        },
        bedrooms: {
          gte: minBedrooms || undefined,
          lte: maxBedrooms || undefined,
        },
        area: {
          gte: minArea || undefined,
          lte: maxArea || undefined,
        },
      };

      // console.log(`where`, where);

      const [properties, totalCount] = await Promise.all([
        ctx.prisma.properties.findMany({
          where,
          skip,
          take: count,
        }),
        ctx.prisma.properties.count({ where }),
      ]);

      const hasMore = skip + count < totalCount;

      return {
        properties: properties.map((item: properties) => ({
          ...item,
          images: JSON.parse(item.images as string),
        })),
        hasMore,
        totalCount,
      };
    },
  },
};

export default resolvers;
