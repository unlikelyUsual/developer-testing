"use client";

import { GET_PROPERTY } from "@/lib/graphql/queries";
import { formatToUSD } from "@/util/number";
import { useQuery } from "@apollo/client";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Box, Callout, Container, Flex, Spinner, Text } from "@radix-ui/themes";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ListingPage({ params }: { params: { id: string } }) {
  const { loading, data, error } = useQuery(GET_PROPERTY, {
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
        <Swiper
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {data.get_property.images.map((i: string, idx: number) => (
            <SwiperSlide key={idx}>
              <img src={i} alt={i} className="w-100"></img>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* {data.get_property.images.map((i: string, idx: number) => (
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
        ))} */}
      </Flex>
      <Text size={"9"} as="p">
        {data.get_property.title}
      </Text>
      <Text style={{ opacity: 0.6 }} size={"4"} as="p">
        {data.get_property.description}
      </Text>
      <Text as="p" mt="4" size={"6"}>
        Posted by Property Owner
      </Text>
      <Text style={{ opacity: 0.6 }} size={"2"} as="p">
        Contact : +91 88912XXXX
      </Text>
    </Container>
  );
}
