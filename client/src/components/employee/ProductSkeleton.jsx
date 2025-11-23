import { Card, CardContent, Divider, Grid, Skeleton } from "@mui/material";
const ProductSkeleton = () => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          boxShadow: 3,
          borderRadius: 3,
          height: "100%",
        }}
      >
        <Skeleton variant="rectangular" height={200} />
        <CardContent>
          <Skeleton variant="text" width="70%" height={28} />
          <Skeleton variant="text" width="40%" height={22} />
          <Divider sx={{ my: 1.5 }} />
          <Skeleton variant="text" width="50%" height={20} />
          <Skeleton variant="rounded" width={100} height={28} />
          <Skeleton variant="text" width="60%" height={20} sx={{ mt: 1 }} />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductSkeleton;
