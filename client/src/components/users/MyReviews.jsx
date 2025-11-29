//TODO Libraries
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
//TODO MUI Components
import {
  Card,
  CardContent,
  Typography,
  Rating,
  Chip,
  Button,
  Box,
} from "@mui/material";
//TODO Context
import { UserContext } from "../../context/UserContext";
//TODO Theme
import { DARK_MODE, LIGHT_MODE } from "../../theme/themeData";
//TODO Components
import Title from "../Title";
//TODO Main Component
const MyReviews = ({ reviews, loading, page, totalPages, setPage }) => {
  //TODO Variables
  const { buttonTheme, titleTheme, paperTheme, theme } =
    useContext(UserContext);
  const navigate = useNavigate();
  //TODO Functions
  //---------------------------------
  const handlePrev = () => {
    page > 1 && setPage((p) => p - 1);
  };
  //---------------------------------
  const handleNext = () => {
    page < totalPages && setPage((p) => p + 1);
  };
  //TODO Return if not have reviews
  if (!reviews?.reviews?.length) {
    return (
      <div className="w-full max-w-5xl mt-6 text-center bg-white rounded-xl shadow p-6">
        <Typography variant="h6" className="text-gray-500">
          You have not posted any reviews yet.
        </Typography>
      </div>
    );
  }
  //TODO Return
  return (
    <div className="w-full max-w-5xl mt-8">
      <div className=" text-2xl">
        <Title text1={"REVIEWS"} text2={reviews.count} />
      </div>
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.reviews.map((review) => (
          <div
            key={review._id}
            className=" cursor-pointer"
            onClick={() =>
              navigate(`/products/product-info/${review.productId}`)
            }
          >
            <Card
              key={review._id}
              sx={{
                ...paperTheme,
                boxShadow: 3,
                borderRadius: 3,
                height: "100%",
                width: "100%",
                transition: "0.2s",
                "&:hover": { transform: "scale(1.03)" },
                cursor: "pointer",
                position: "relative",
              }}
              className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={review.productImageUrl}
                alt={review.productImageAlt}
                className="w-full h-52 object-cover rounded-t-2xl"
              />
              <CardContent className="p-4 flex flex-col gap-2">
                {/* Product Name */}
                <Typography sx={titleTheme} className="font-bold line-clamp-2">
                  {review.productName}
                </Typography>

                {/* Category */}
                <div className="flex gap-2 flex-wrap">
                  <Chip
                    sx={{
                      bgcolor: theme === "dark" ? DARK_MODE.Secondary : "",
                      color:
                        theme === "dark"
                          ? DARK_MODE.TextPrimary
                          : LIGHT_MODE.TextPrimary,
                    }}
                    label={review.productCategory}
                    size="small"
                  />
                  <Chip
                    sx={{
                      bgcolor: theme === "dark" ? DARK_MODE.Secondary : "",
                      color:
                        theme === "dark"
                          ? DARK_MODE.TextPrimary
                          : LIGHT_MODE.TextPrimary,
                    }}
                    label={review.productSubCategory}
                    size="small"
                  />
                </div>

                {/* Price & Status */}
                <div className="flex justify-between items-center mt-1">
                  <Typography className="font-semibold text-green-600">
                    ${review.productPrice}
                  </Typography>
                  <Chip
                    label={review.productStatus}
                    color={
                      review.productStatus === "Available" ? "success" : "error"
                    }
                    size="small"
                  />
                </div>
                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <Rating value={review.rating} readOnly size="small" />
                  <Typography className="text-sm ">
                    ({review.rating}/5)
                  </Typography>
                </div>

                {/* Comment */}
                <Typography className=" text-sm mt-1 line-clamp-3">
                  {review.comment}
                </Typography>

                {/* Date */}
                <div
                  style={{
                    position: "absolute",
                    right: 5,
                    top: "94%",
                    color: DARK_MODE.Accent,
                    fontWeight: "bold",
                    letterSpacing: "1.5px",
                    fontSize: "14px",
                    marginTop: "5px",
                  }}
                >
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
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
    </div>
  );
};

export default MyReviews;
