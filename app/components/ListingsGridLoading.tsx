import { Grid, Skeleton } from "@radix-ui/themes";

export const ListingsGridLoading = () => {
  return (
    <Grid mx="auto" gap="6" columns={{ sm: "1", md: "2", lg: "3", xl: "4" }}>
      {Array.from(Array(9), (_, idx) => (
        <Skeleton key={idx} width={"20rem"} height={"14rem"}></Skeleton>
      ))}
    </Grid>
  );
};
