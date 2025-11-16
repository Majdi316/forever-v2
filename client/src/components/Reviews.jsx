//TODO Libraries
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
//TODO Context
import { UserContext } from "../context/UserContext";
//TODO Assets
import { assets } from "../assets/assets";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

const Reviews = () => {
  //TODO Variables
  const { id: productId } = useParams();
  const { backendUrl, token, titleTheme, paperTheme, buttonTheme, user } =
    useContext(UserContext);

  //TODO States
  const [reviewData, setReviewData] = useState([]);
  const [form, setForm] = useState({ rating: 0, comment: "" });
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  //TODO Fetch Reviews
  const fetchReviewsData = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/reviews/${productId}`
      );
      if (response.data.success) {
        setReviewData(response.data.reviews);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  //TODO Delete Review
  const deleteReview = async (reviewId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/reviews/delete/${reviewId}`,
        {},
        {
          headers: { "x-auth-token": token },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  //TODO Add or Edit Review
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.comment.trim() === "" || form.rating === 0) {
      toast.error("Please provide both rating and comment");
      return;
    }

    try {
      const url = editMode
        ? `${backendUrl}/api/reviews/edit/${editingId}`
        : `${backendUrl}/api/reviews/${productId}`;

      const response = await axios.post(
        url,
        { rating: form.rating, comment: form.comment },
        { headers: { "x-auth-token": token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchReviewsData();
        setForm({ rating: 0, comment: "" });
        setEditMode(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  //TODO Edit Review Handler
  const handleEdit = (review) => {
    setForm({
      rating: review.rating,
      comment: review.comment,
    });
    setEditingId(review._id);
    setEditMode(true);
  };

  //TODO useEffects
  useEffect(() => {
    fetchReviewsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewData]);

  //TODO Return
  return (
    <div className="w-full py-10 px-4 sm:px-8 lg:px-16 rounded-2xl mt-10 ">
      {/* Section Header */}
      <h2
        style={titleTheme}
        className="text-2xl sm:text-3xl font-semibold mb-8 border-b pb-3"
      >
        Customer Reviews
      </h2>

      {/* Reviews List */}
      <div className="space-y-8">
        {reviewData.length > 0 ? (
          reviewData.map((review) => (
            <div
              style={paperTheme}
              key={review._id}
              className=" rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                {/* Avatar and Info */}
                <div className="flex items-start gap-3">
                  <img
                    src={review.userAvatar || assets.user_icon}
                    alt="user avatar"
                    className="w-10 h-10 rounded-full border object-cover"
                  />
                  <div>
                    <p style={titleTheme} className="font-medium">
                      {review.userName?.first +
                        " " +
                        (review.userName?.middle || "") +
                        " " +
                        review.userName?.last}
                    </p>
                    <p className="text-sm">{review.userEmail}</p>
                    <p className="text-xs  mt-1">
                      {new Date(review.createdAt).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>

                {/* Rating + Edit Button */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <img
                        key={i}
                        src={assets.star_icon}
                        alt="star"
                        className={`w-4 ${
                          i < review.rating ? "opacity-100" : "opacity-25"
                        }`}
                      />
                    ))}
                  </div>
                  {user._id !== review.userId ? null : (
                    <>
                      {" "}
                      <Button
                        style={buttonTheme}
                        onClick={() => handleEdit(review)}
                        className="text-sm font-medium transition"
                      >
                        ✏️ Edit
                      </Button>
                    </>
                  )}
                  {!user.isManager && user._id !== review.userId ? null : (
                    <>
                      {" "}
                      <button onClick={() => deleteReview(review._id)}>
                        <DeleteIcon
                          style={{ color: "red", cursor: "pointer" }}
                        />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Comment */}
              <p
                style={titleTheme}
                className=" leading-relaxed border-l-4 border-blue-500 pl-3 ml-1"
              >
                {review.comment}
              </p>
            </div>
          ))
        ) : (
          <p style={titleTheme} className="text-center ">No reviews yet.</p>
        )}
      </div>

      {/* Add/Edit Review Form */}
      <div className="mt-12 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          {editMode ? "Edit Your Review" : "Write a Review"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Rating */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Your Rating:
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <img
                  key={num}
                  src={assets.star_icon}
                  alt="star"
                  onClick={() => setForm({ ...form, rating: num })}
                  className={`w-6 sm:w-7 cursor-pointer transition ${
                    num <= form.rating ? "opacity-100" : "opacity-25"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Comment */}
          <textarea
            placeholder="Share your experience..."
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none min-h-[100px] text-gray-700"
          ></textarea>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button style={buttonTheme}
              type="submit"
              className=" px-6 py-2 rounded-lg font-medium transition"
            >
              {editMode ? "Update Review" : "Submit Review"}
            </Button>
            {editMode && (
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setForm({ rating: 0, comment: "" });
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer px-6 py-2 rounded-lg font-medium transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
