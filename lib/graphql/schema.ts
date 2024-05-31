const typeDefs = `#graphql
  type Property {
    id: ID!
    project: String
    title: String
    price: Float
    bedrooms: Int
    thumbnail : String
    area: Float
    description: String
    type: String
    images: [String]
  }

  type PropertyResponse {
    properties : [Property]
    hasMore : Boolean
    totalCount : Int
  }

  type Query {
    get_properties(
      type: String, 
      minPrice: Float, 
      maxPrice: Float, 
      minBedrooms: Int, 
      maxBedrooms: Int, 
      minArea: Float, 
      maxArea: Float,
      skip : Int,
      count : Int,
    ): PropertyResponse

    get_property(id : ID): Property
  }
`;

export default typeDefs;
