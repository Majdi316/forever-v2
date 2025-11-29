//TODO Libraries
import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
//TODO Context
import { UserContext } from "../../context/UserContext";
//TODO MUI Components
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Divider,
  Button,
} from "@mui/material";
//TODO Components
import ProductSkeleton from "../../components/employee/ProductSkeleton";
import BlurIn from "../../components/employee/BlurIn";
//TODO Theme
import { DARK_MODE } from "../../theme/themeData";
const FavoriteProducts = () => {
  //TODO States
  const [myProducts, setMyProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);

  //TODO Variables
  const {
    backendUrl,
    user,
    token,
    navigate,
    paperTheme,
    titleTheme,
    theme,
    buttonTheme,
    userFullDetails,
  } = useContext(UserContext);
  const limit = 3;
  //TODO Functions
  const fetchProducts = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${backendUrl}/api/products/my-favorite/${user?._id}/products?page=${pageNumber}&limit=${limit}`,
        { headers: { "x-auth-token": token } }
      );
      setMyProducts(res.data.products);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
      setTotalProducts(res.data.count);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error loading products");
    } finally {
      setLoading(false);
    }
  };

  //---------------------------------
  const handlePrev = () => {
    window.scrollTo(0, 0);
    page > 1 && setPage((p) => p - 1);
  };
  //---------------------------------
  const handleNext = () => {
    window.scrollTo(0, 0);
    page < totalPages && setPage((p) => p + 1);
  };
  //TODO useEffect
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  useEffect(() => {
    fetchProducts(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  return (
    <Box sx={{ padding: { xs: 2, md: 4 } }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
        textAlign={{ xs: "center", md: "left" }}
        sx={titleTheme}
      >
        Favorite Products - {totalProducts}
      </Typography>

      {/* Skeleton Loader */}
      {loading && (
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <ProductSkeleton key={n} />
          ))}
        </Grid>
      )}

      {/* No Products */}
      {!loading && myProducts.length === 0 && (
        <Typography textAlign="center" color="gray" mt={4}>
          No products found.
        </Typography>
      )}

      {/* Products Grid */}
      {!loading && (
        <Grid sx={{ width: "100%" }} container spacing={3}>
          {myProducts.map((product) => (
            <Grid
              sx={{ width: "100%" }}
              item
              key={product._id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <BlurIn>
                <div
                  className=" w-full"
                  onClick={() =>
                    navigate(`/products/product-info/${product._id}`)
                  }
                >
                  <Card
                    className=" flex flex-col sm:flex-row w-full"
                    sx={{
                      ...paperTheme,
                      boxShadow: 3,
                      borderRadius: 3,
                      height: "100%",
                      width: "100%",
                      transition: "0.2s",
                      "&:hover": { transform: "scale(1.03)" },
                      cursor: "pointer",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.image?.[0]?.url}
                      alt={product.name}
                      className="w-full h-70 sm:max-w-70"
                      sx={{ objectFit: "fill" }}
                    />

                    <CardContent sx={{ flexGrow: 1 }}>
                      <div className=" flex flex-col justify-between lg:flex-row lg:items-center items-start gap-2">
                        <Typography
                          style={titleTheme}
                          variant="h6"
                          fontWeight="bold"
                        >
                          {product.name}
                        </Typography>
                        <p
                          className={` text-white font-bold p-2 rounded-full tracking-wider opacity-70 text-sm
                          ${
                            product.status === "Available"
                              ? "bg-green-600"
                              : product.status === "Coming-Soon"
                              ? "bg-red-600"
                              : "bg-gray-600"
                          }`}
                        >
                          {product.status}
                        </p>
                      </div>
                      {/* Price */}
                      {userFullDetails.isSubscribe ? (
                        <>
                          <div className=" flex items-center justify-between mt-3">
                            <div className=" flex gap-2 items-center">
                              <span className="line-through">
                                ${product.price}
                              </span>
                              <span className="text-green-600 dark:text-green-400 font-bold text-lg">
                                ${product.price * 0.8}
                              </span>
                            </div>
                            <p>💘 {product.likes.length}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          {" "}
                          <div className=" flex items-center justify-between">
                            <Typography color="gray" mt={0.5}>
                              ${product.price}
                            </Typography>
                            <p>💘 {product.likes.length}</p>
                          </div>
                        </>
                      )}

                      <Divider
                        sx={{
                          my: 1.5,
                          bgcolor: theme === "dark" ? "white" : "",
                        }}
                      />

                      <p>
                        {product.category}/{product.subCategory}
                      </p>

                      {/* Sizes */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {product.sizes.map((size) => (
                          <span
                            key={size}
                            className="border px-2 py-1 rounded text-xs"
                          >
                            {size}
                          </span>
                        ))}
                      </div>

                      <Typography
                        className=" flex flex-row-reverse"
                        variant="caption"
                        mt={1}
                        sx={{ color: DARK_MODE.Accent, fontSize: 16 }}
                      >
                        Added:{" "}
                        {new Date(product.createdAt).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </BlurIn>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <Box
          mt={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Button
            sx={buttonTheme}
            variant="contained"
            color="primary"
            onClick={handlePrev}
            disabled={page === 1}
          >
            Previous
          </Button>

          <Typography style={titleTheme}>
            Page <strong>{page}</strong> of <strong>{totalPages}</strong>
          </Typography>

          <Button
            sx={buttonTheme}
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FavoriteProducts;
