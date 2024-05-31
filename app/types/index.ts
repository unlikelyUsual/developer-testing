export const INR_L = 100000;
export const INR_K = 1000;

export const PRICE_RANGE = {
  min: 5000,
  max: 15000,
};

export const BEDROOM_COUNT_RANGE = {
  min: 1,
  max: 5,
};

export const LIVING_AREA_RANGE = {
  min: 100,
  max: 2500,
};

export type ListingType = "RENT" | "SALE";

export type Listing = {
  id: number;
  project: string;
  type: ListingType;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  bedrooms: number;
  area: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type FilterOptions = {
  listingType: ListingType;
  priceRange?: typeof PRICE_RANGE;
  bedroomCountRange?: typeof BEDROOM_COUNT_RANGE;
  livingAreaRange?: typeof LIVING_AREA_RANGE;
};
