/* eslint-disable @next/next/no-img-element */
import createApolloClient from "@/app/apolloClient";
import { GET_PROPERTY } from "@/lib/graphql/queries";
import { formatToUSD } from "@/util/number";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import {
  Box,
  Callout,
  Card,
  Container,
  Flex,
  Inset,
  Spinner,
  Text,
} from "@radix-ui/themes";

export default async function ListingPage({
  params,
}: {
  params: { id: string };
}) {
  const client = createApolloClient();

  const { loading, data, error } = await client.query({
    query: GET_PROPERTY,
    context: {},
    variables: {
      id: parseInt(params.id),
    },
  });

  if (loading) {
    return (
      <Flex justify={"center"}>
        <Spinner size="3" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Callout.Root color="amber">
        <Callout.Icon>
          <ExclamationTriangleIcon />
        </Callout.Icon>
        <Callout.Text>Could not fetch, try again later</Callout.Text>
      </Callout.Root>
    );
  }

  return (
    <Container size="3">
      <Box mb="4">
        <Text size="8" weight={"bold"}>
          {formatToUSD(data.get_property.price)}
        </Text>
        <Text as="p" size="4">
          <Text weight={"bold"}>
            {data.get_property.type === "RENT" ? "Rent" : "Sale"}
          </Text>{" "}
          &bull; {data.get_property.bedrooms}BHK &bull; {data.get_property.area}{" "}
          sq.ft.
        </Text>
      </Box>

      <Flex
        gap="6"
        position={"relative"}
        overflow={"scroll"}
        style={{ scrollSnapType: "x" }}
      >
        {data.get_property.images.map((i: string, idx: number) => (
          <Box
            flexShrink={"0"}
            style={{ scrollSnapAlign: "start" }}
            width={"25rem"}
            key={idx}
          >
            <Card>
              <Inset clip={"padding-box"}>
                <img src={i} alt={i} />
              </Inset>
            </Card>
          </Box>
        ))}
      </Flex>
      <Text size={"9"} as="p">
        {data.get_property.title}
      </Text>
      <Text style={{ opacity: 0.6 }} size={"4"} as="p">
        {data.get_property.description}
      </Text>
      <Text as="p" mt="4">
        Posted by Owner
      </Text>
      <Text style={{ opacity: 0.6 }} as="p">
        contact on email
      </Text>
    </Container>
  );
}
