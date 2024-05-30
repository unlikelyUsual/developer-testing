"use client";

import {
  BEDROOM_COUNT_RANGE,
  FilterOptions,
  ListingType,
  LIVING_AREA_RANGE,
  PRICE_RANGE,
} from "@/app/types";
import { formatToUSD } from "@/util/number";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  SegmentedControl,
  Slider,
  Text,
} from "@radix-ui/themes";
import { FormEvent, PropsWithChildren, ReactNode, useState } from "react";

const FilterSection = ({
  children,
  label,
  selection,
}: PropsWithChildren<{ label: string; selection?: ReactNode }>) => {
  return (
    <Box>
      <Box mb="2">
        <Text weight={"bold"}>{label}</Text>
      </Box>
      {selection && <Box mb="4">{selection}</Box>}

      <>{children}</>
    </Box>
  );
};

const FilterSectionRange = (props: {
  min: number | string;
  max: number | string;
}) => {
  const { min, max } = props;
  return (
    <Flex style={{ opacity: 0.6 }} pt="2" justify={"between"}>
      <Text size={"2"}>{min}</Text>
      <Text size="2">{max}</Text>
    </Flex>
  );
};

export const PropertyFilters = (props: {
  filterOptions: FilterOptions;
  onSubmit: (options: FilterOptions) => void;
}) => {
  const { filterOptions: o } = props;
  const [listingType, setListingType] = useState<ListingType>(o.listingType);

  const [priceRange, setPriceRange] = useState(
    o?.priceRange ? [o?.priceRange?.min, o?.priceRange?.max] : [5000, 15000]
  );
  const [bedroomCountRange, setBedroomCountRange] = useState(
    o.bedroomCountRange
      ? [o?.bedroomCountRange?.min, o?.bedroomCountRange?.max]
      : [1, 5]
  );
  const [livingAreaRange, setLivingAreaRange] = useState(
    o.livingAreaRange
      ? [o.livingAreaRange?.min, o.livingAreaRange?.max]
      : [100, 2500]
  );

  const [isOpen, setIsOpen] = useState(true);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.onSubmit({
      listingType,
      bedroomCountRange: {
        min: bedroomCountRange[0],
        max: bedroomCountRange[1],
      },
      livingAreaRange: {
        min: livingAreaRange[0],
        max: livingAreaRange[1],
      },
      priceRange: {
        min: priceRange[0],
        max: priceRange[1],
      },
    });
  };

  const toggleOpen = () => setIsOpen((p) => !p);

  return (
    <Flex direction={"column"}>
      <Flex gap="4" style={{ justifyContent: "stretch" }}>
        <Button style={{ flex: "1" }} size="3" onClick={onSubmit}>
          Search
        </Button>
        <Box display={{ initial: "block", sm: "none" }}>
          <IconButton size="3" onClick={toggleOpen}>
            <DotsVerticalIcon />
          </IconButton>
        </Box>
      </Flex>
      <Flex
        pt="6"
        className={`collapsible ${isOpen ? "open" : "close"}`}
        direction={"column"}
        gap="6"
      >
        <FilterSection label={"Listing Type"}>
          <SegmentedControl.Root
            value={listingType}
            onValueChange={(c: ListingType) => {
              setPriceRange(([min, max]) => [min, max]);
              setListingType(c);
            }}
          >
            <SegmentedControl.Item value="RENT">Rent</SegmentedControl.Item>
            <SegmentedControl.Item value="SALE">Sale</SegmentedControl.Item>
          </SegmentedControl.Root>
        </FilterSection>

        <FilterSection
          label={"Price Range"}
          selection={`${formatToUSD(priceRange[0])} - ${formatToUSD(
            priceRange[1]
          )}`}
        >
          <Slider
            step={5}
            minStepsBetweenThumbs={1}
            value={priceRange}
            onValueChange={setPriceRange}
            min={PRICE_RANGE.min}
            max={PRICE_RANGE.max}
          />

          <FilterSectionRange
            min={formatToUSD(PRICE_RANGE.min)}
            max={formatToUSD(PRICE_RANGE.max)}
          />
        </FilterSection>

        <FilterSection
          label={"Bedrooms"}
          selection={`${bedroomCountRange[0]}BHK - ${bedroomCountRange[1]}BHK`}
        >
          <Slider
            value={bedroomCountRange}
            minStepsBetweenThumbs={1}
            onValueChange={setBedroomCountRange}
            {...BEDROOM_COUNT_RANGE}
          />
          <FilterSectionRange {...BEDROOM_COUNT_RANGE} />
        </FilterSection>
        <FilterSection
          label={"Living Area"}
          selection={`${livingAreaRange[0]} sq.ft. - ${livingAreaRange[1]} sq.ft.`}
        >
          <Slider
            step={50}
            minStepsBetweenThumbs={10}
            value={livingAreaRange}
            onValueChange={setLivingAreaRange}
            {...LIVING_AREA_RANGE}
          />
          <FilterSectionRange
            min={`${LIVING_AREA_RANGE.min} sq.ft.`}
            max={`${LIVING_AREA_RANGE.max} sq.ft.`}
          />
        </FilterSection>
      </Flex>
    </Flex>
  );
};
