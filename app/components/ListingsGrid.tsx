/* eslint-disable @next/next/no-img-element */

import { formatToUSD } from "@/util/number";
import { Box, Card, Grid, Inset, Text } from "@radix-ui/themes";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { Listing } from "../types";

export const ListingsGrid = ({
  listings,
  children,
}: PropsWithChildren<{ listings: Listing[] }>) => {
  return (
    <>
      <Grid mx="auto" gap="6" columns={{ sm: "1", md: "2", lg: "3", xl: "4" }}>
        {listings.map((p) => (
          <Card
            key={p.id}
            className="cursor-pointer hover:shadow-indigo-500/40"
            asChild
          >
            <Link href={`/listing/${p.id}`} target="_blank">
              <Inset clip="padding-box" side="top" pb="current">
                <img
                  className="inset-card-image"
                  src={p.thumbnail}
                  alt={p.thumbnail}
                  style={{ maxWidth: "20rem" }}
                />
              </Inset>
              <Box maxWidth={"18rem"}>
                <Text as="p" size="6" weight={"bold"}>
                  {formatToUSD(p.price)}
                </Text>
                <Text as="p" size="2">
                  {p.bedrooms}BHK &bull; {p.area} sq.ft.
                </Text>
                <Text as="p" size="4" truncate>
                  {p.project}
                </Text>
              </Box>
            </Link>
          </Card>
        ))}

        {children}
      </Grid>
    </>
  );
};
