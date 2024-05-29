const typeDefs = `#graphql
  type Property {
    id: ID!
    project: String
    title: String
    price: Float
    bedrooms: Int
    area: Float
    description: String
    type: String
    images: [String]
  }

  type Query {
    get_properties(
      type: String, 
      minPrice: Float, 
      maxPrice: Float, 
      minBedrooms: Int, 
      maxBedrooms: Int, 
      minArea: Float, 
      maxArea: Float
    ): [Property]
  }
`;

export default typeDefs;