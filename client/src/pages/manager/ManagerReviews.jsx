/* eslint-disable no-unused-vars */
//TODO Libraries
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
//TODO MUI Components
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Rating,
  Chip,
  CircularProgress,
  Pagination,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
//TODO Context
import { UserContext } from "../../context/UserContext";
//TODO Theme
import { customTextFieldStyles } from "../../helper/styeTextInput";
import { DARK_MODE, LIGHT_MODE } from "../../theme/themeData";
//TODO Main Component
const ManagerReviews = () => {
  //TODO Variables
  const { backendUrl, token, paperTheme, titleTheme, theme, paragraphTheme } =
    useContext(UserContext);
  //TODO States
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rating, setRating] = useState("");
  const [userSearch, setUserSearch] = useState("");
  //TODO Functions
  //------------ FETCH REVIEWS DATA FUNCTION ----------------
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${backendUrl}/api/manager/reviews?page=${page}&limit=6&rating=${rating}&user=${userSearch}`,
        { headers: { "x-auth-token": token } }
      );

      setReviews(data.reviews);
      setTotalPages(data.totalPages);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  //------------ DELETE REVIEW FUNCTION ----------------
  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(`${backendUrl}/api/manager/reviews/${reviewId}`, {
        headers: { "x-auth-token": token },
      });
      toast.success("Review deleted successfully!");
      fetchReviews(); //! refresh list after deletion
    } catch (err) {
      toast.error("Failed to delete review");
    }
  };
  //TODO useEffects
  //------------------------
  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rating, userSearch]);
  //------------------------
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  //TODO Return
  return (
    <div className="p-4 md:p-8 w-full">
      <Typography
        sx={titleTheme}
        variant="h4"
        className="mb-6 font-bold text-center"
      >
        Reviews Management
      </Typography>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <TextField
          sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
          label="Search user"
          variant="outlined"
          fullWidth
          placeholder="Search by first or last name or by email"
          value={userSearch}
          onChange={(e) => {
            setPage(1);
            setUserSearch(e.target.value);
          }}
        />
        <TextField
          sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
          select
          label="Rating"
          value={rating}
          onChange={(e) => {
            setPage(1);
            setRating(e.target.value);
          }}
          className="sm:w-48"
        >
          <MenuItem value="">All</MenuItem>
          {[5, 4, 3, 2, 1].map((r) => (
            <MenuItem key={r} value={r}>
              {r} Stars
            </MenuItem>
          ))}
        </TextField>
      </div>

      {/* Reviews */}
      {loading ? (
        <div className="flex justify-center mt-20">
          <CircularProgress />
        </div>
      ) : reviews.length === 0 ? (
        <div className=" w-full flex flex-col items-center justify-center mt-20 gap-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" // optional icon
            alt="No reviews"
            className="w-24 h-24 opacity-50"
          />
          <Typography sx={titleTheme} variant="h6">
            No reviews found
          </Typography>
          <Typography sx={paragraphTheme} variant="body2">
            Reviews will appear here when users submit them.
          </Typography>
        </div>
      ) : (
        <div className=" w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card
              sx={paperTheme}
              key={review._id}
              className="rounded-2xl shadow hover:shadow-xl transition"
            >
              <div className="flex justify-end">
                <Tooltip title="Delete Review">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(review._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <CardContent>
                {/* User Info */}
                <div className="flex items-center gap-4 mb-4">
                  <Avatar src={review.user?.image?.url} />
                  <div>
                    <Typography sx={titleTheme} className="font-semibold">
                      {review.user?.name?.first} {review.user?.name?.last}
                    </Typography>
                    <Typography
                      sx={titleTheme}
                      variant="body2"
                      color="text.secondary"
                    >
                      {review.user?.email}
                    </Typography>
                  </div>
                </div>
                {/* Product Info  */}
                <div
                  style={{
                    background:
                      theme === "dark"
                        ? DARK_MODE.Secondary
                        : LIGHT_MODE.Secondary,
                  }}
                  className="flex gap-4 mb-4 p-3 rounded-xl "
                >
                  <Avatar
                    variant="rounded"
                    src={review.product?.image[0].url}
                    className="w-14 h-14"
                  />
                  <div className="flex-1">
                    <Typography sx={titleTheme} className="font-semibold">
                      {review.product?.name}
                    </Typography>
                    <Typography variant="body2">
                      {review.product?.category}
                    </Typography>
                    <div className="flex gap-2 mt-1">
                      <Chip
                        label={`${review.product?.price} $`}
                        color="primary"
                        size="small"
                      />
                      {review.product?.status === "Available" ? (
                        <Chip label="Available" color="success" size="small" />
                      ) : review.product?.status === "Sold-Out" ? (
                        <Chip label="Sold-Out" color="error" size="small" />
                      ) : (
                        <Chip
                          label="Coming-Soon"
                          color="warning"
                          size="small"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <Rating value={review.rating} readOnly />

                <Typography className="mt-3">{review.comment}</Typography>

                <div className="flex gap-2 mt-4">
                  {review.user?.isVerified && (
                    <Chip label="Verified" color="success" size="small" />
                  )}
                  {review.user?.isBlocked && (
                    <Chip label="Blocked" color="error" size="small" />
                  )}
                </div>

                <Typography
                  variant="caption"
                  className="block mt-3 text-right"
                  sx={{ color: DARK_MODE.Accent }}
                >
                  {new Date(review.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, v) => setPage(v)}
          sx={{
            "& .MuiPaginationItem-root": {
              color: titleTheme,
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#FF7043",
              color: "#fff",
            },
            "& .MuiPaginationItem-root:hover": {
              backgroundColor: "#FF8A65",
            },
          }}
        />
      </div>
    </div>
  );
};

export default ManagerReviews;
