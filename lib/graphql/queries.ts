import { gql } from "@apollo/client";

export const GET_PROPERTIES = gql`
  query Properties(
    $type: String
    $minPrice: Float
    $maxPrice: Float
    $minBedrooms: Int
    $maxBedrooms: Int
    $minArea: Float
    $maxArea: Float
  ) {
    get_properties(
      type: $type
      minPrice: $minPrice
      maxPrice: $maxPrice
      minBedrooms: $minBedrooms
      maxBedrooms: $maxBedrooms
      minArea: $minArea
      maxArea: $maxArea
    ) {
      properties {
        id
        type
        title
        description
        price
        project
        area
        bedrooms
        images
      }
      hasMore
      totalCount
    }
  }
`;

export const GET_PROPERTY = gql`
  query Properties($id: ID) {
    get_property(id: $id) {
      area
      bedrooms
      description
      id
      images
      price
      project
      title
      type
    }
  }
`;
