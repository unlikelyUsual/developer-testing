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

      const [properties, totalCount] = await Promise.all([
        ctx.prisma.property.findMany({
          where,
          skip,
          take: count,
        }),
        ctx.prisma.property.count({ where }),
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
