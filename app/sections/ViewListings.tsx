"use client";
import { GET_PROPERTIES } from "@/lib/graphql/queries";
import { useQuery } from "@apollo/client";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import { Box, Button, Callout, Flex } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { PropertyFilters } from "../components/inputs/PropertyFilters";
import { ListingsGrid } from "../components/ListingsGrid";
import { ListingsGridLoading } from "../components/ListingsGridLoading";
import { FETCH_LISTINGS_LIMIT } from "../constants";
import { FilterOptions, Listing } from "../types/index";

export const ViewListings = (props: {
  initFilterOptions?: FilterOptions | null;
  initListings: Listing[] | null;
}) => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(
    props.initFilterOptions ?? {
      listingType: "RENT",
      bedroomCountRange: {
        min: 1,
        max: 5,
      },
      livingAreaRange: {
        min: 100,
        max: 2500,
      },
      priceRange: {
        min: 5000,
        max: 15000,
      },
    }
  );

  const [pagination, setPagination] = useState({
    limit: FETCH_LISTINGS_LIMIT,
    offset: 0,
  });

  const fetchPrev = () =>
    setPagination((p) => ({ ...p, offset: p.offset - p.limit }));

  const fetchNext = () =>
    setPagination((p) => ({ ...p, offset: p.offset + p.limit }));

  const { data, loading, error } = useQuery(GET_PROPERTIES, {
    variables: {
      type: filterOptions.listingType,
      minPrice: filterOptions?.priceRange?.min || null,
      maxPrice: filterOptions?.priceRange?.max || null,
      minBedrooms: filterOptions?.bedroomCountRange?.min || null,
      maxBedrooms: filterOptions?.bedroomCountRange?.max || null,
      minArea: filterOptions?.livingAreaRange?.min || null,
      maxArea: filterOptions?.livingAreaRange?.max || null,
      skip: pagination.offset,
      count: pagination.limit,
    },
  });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onSubmit = (options: FilterOptions) => {
    setFilterOptions(options);
    const qs = new URLSearchParams(searchParams.toString());
    qs.set("filter", JSON.stringify(options));
    router.push(pathname + "?" + qs.toString());
  };

  return (
    <Flex
      direction={{ initial: "column", xs: "column", sm: "row" }}
      gap="5"
      position={"relative"}
      align={"start"}
      py={"3"}
    >
      <Box
        width={{ initial: "100%", xs: "100%", sm: "40vw", md: "20vw" }}
        position={"sticky"}
        top={{ initial: "0", sm: "6" }}
        pt={{ initial: "6", sm: "0" }}
        style={{ zIndex: 10, background: "var(--color-background)" }}
      >
        <PropertyFilters filterOptions={filterOptions} onSubmit={onSubmit} />
      </Box>

      {loading && <ListingsGridLoading />}

      {error && (
        <div className="flex justify-items-center text-center w-10">
          <Callout.Root color="amber">
            <Callout.Icon>
              <ExclamationTriangleIcon />
            </Callout.Icon>
            <Callout.Text>Could not fetch, try again later</Callout.Text>
          </Callout.Root>
        </div>
      )}
      {data && data.get_properties && (
        <ListingsGrid listings={data.get_properties.properties}>
          <Flex gap="4" justify={"center"} align={"center"}>
            <Button disabled={pagination.offset === 0} onClick={fetchPrev}>
              <ArrowLeftIcon />
              Previous
            </Button>
            <Button disabled={!data.get_properties.hasMore} onClick={fetchNext}>
              <ArrowRightIcon />
              Next
            </Button>
          </Flex>
        </ListingsGrid>
      )}
    </Flex>
  );
};
