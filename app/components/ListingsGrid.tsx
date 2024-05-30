/* eslint-disable @next/next/no-img-element */

import { formatToUSD } from "@/util/number";
import { Box, Card, Grid, Inset, Text } from "@radix-ui/themes";
import Link from "next/link";
import { Listing } from "../types";

export const ListingsGrid = ({ listings }: { listings: Listing[] }) => {
  return (
    <Grid mx="auto" gap="6" columns={{ sm: "1", md: "2", lg: "3", xl: "4" }}>
      {listings.map((p) => (
        <Card key={p.id}>
          <Link href={`/listing/${p.id}`}>
            <Inset clip="padding-box" side="top" pb="current">
              <img
                className="inset-card-image"
                src={p.images[0]}
                alt={p.images[0]}
                style={{ maxWidth: "20rem" }}
              />
            </Inset>
          </Link>
          <Box maxWidth={"18rem"}>
            <Text as="p" size="6" weight={"bold"}>
              {formatToUSD(p.price)}
            </Text>
            <Text as="p" size="4">
              {p.bedrooms}BHK &bull; {p.area} sq.ft.
            </Text>
            <Text as="p" size="3" truncate>
              {p.title}
            </Text>
            <Text as="p" size="2" truncate>
              {p.description}
            </Text>
          </Box>
        </Card>
      ))}
    </Grid>
  );
};
