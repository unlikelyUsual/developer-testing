import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import { __DEV__ } from "@apollo/client/utilities/globals";
import { ViewListings } from "./sections/ViewListings";
import { FilterOptions, Listing } from "./types";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    filter?: string /** FilterOptions */;
  };
}) {
  let listings: Listing[] | null = null;
  let filterOptions: FilterOptions | null = null;

  if (searchParams.filter) {
    filterOptions = JSON.parse(searchParams.filter) as FilterOptions;
    // const { data, loading, error } = useQuery(GET_PROPERTIES);
    // listings = await api.get.properties(filterOptions);
  }

  if (__DEV__) {
    // Adds messages only in a dev environment
    loadDevMessages();
    loadErrorMessages();
  }

  return (
    <ViewListings initFilterOptions={filterOptions} initListings={listings} />
  );
}
