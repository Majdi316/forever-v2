//TODO Libraries
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
//TODO MUI Components
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  CircularProgress,
  TextField,
  MenuItem,
  Pagination,
} from "@mui/material";
//TODO Context
import { UserContext } from "../../context/UserContext";
//TODO Theme
import { customTextFieldStyles } from "../../helper/styeTextInput";
import { DARK_MODE, LIGHT_MODE } from "../../theme/themeData";
//TODO External Components
import EmptyProducts from "../../components/manager/EmptyProducts";
//TODO Global Variables
const categories = ["Men", "Women", "Kids"];
//TODO Main Component
const AdminProductsAnalytics = () => {
  //TODO Variables
  const { backendUrl, token, titleTheme, paperTheme, theme, navigate } =
    useContext(UserContext);
  //TODO States
  const [products, setProducts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    employeeId: "",
  });
  //TODO Functions
  //------------ FETCH PRODUCT DATA FUNCTION ----------------
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/manager/products-analytics`,
        {
          params: { ...filters, page, limit: 6 },
          headers: { "x-auth-token": token },
        }
      );
      setProducts(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      toast.error(error?.response?.data.message);
    } finally {
      setLoading(false);
    }
  };
  //------------ FETCH EMPLOYEE DATA FUNCTION ----------------
  const fetchEmployees = async () => {
    const { data } = await axios.get(`${backendUrl}/api/manager/employees`, {
      headers: { "x-auth-token": token },
    });
    setEmployees(data.data);
  };
  //------------ DELETE SOLD OUT PRODUCT FUNCTION ----------------
  const handleDelete = async (productId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this sold-out product?"
    );
    if (!confirm) return;
    try {
      await axios.delete(
        `${backendUrl}/api/manager/delete-soldout/${productId}`,
        {
          headers: { "x-auth-token": token },
        }
      );
      // Re-fetch current page (keeps filters & pagination)
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };
  //TODO useEffects
  //------------------------
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters]);
  //------------------------

  useEffect(() => {
    fetchEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //TODO Return
  return (
    <div className="p-4 w-full ">
      {/* Filters */}
      <div className=" w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <TextField
          sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
          label="Search Product"
          value={filters.search}
          onChange={(e) => {
            setFilters({ ...filters, search: e.target.value });
            setPage(1);
          }}
        />

        <TextField
          sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
          select
          label="Category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
          select
          label="Employee"
          value={filters.employeeId}
          onChange={(e) =>
            setFilters({ ...filters, employeeId: e.target.value })
          }
        >
          <MenuItem value="">All</MenuItem>
          {employees.map((emp) => (
            <MenuItem key={emp._id} value={emp._id}>
              {emp.name.first} {emp.name.last}
            </MenuItem>
          ))}
        </TextField>
      </div>
      {/* Products */}
      {loading ? (
        <div className="flex justify-center mt-10">
          <CircularProgress />
        </div>
      ) : products.length === 0 ? (
        <EmptyProducts />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card
              sx={paperTheme}
              onClick={() => navigate(`/products/product-info/${product._id}`)}
              key={product._id}
              className="rounded-2xl shadow cursor-pointer hover:scale-105"
            >
              <img
                src={product.image?.[0]?.url}
                alt=""
                className="h-48 w-full object-cover rounded-t-2xl"
              />

              <CardContent className="space-y-2">
                <Typography sx={titleTheme} variant="h6">
                  {product.name}
                </Typography>

                <Chip
                  label={product.status}
                  color={
                    product.status === "Sold-Out"
                      ? "error"
                      : product.status === "Coming-Soon"
                      ? "warning"
                      : "success"
                  }
                  size="small"
                />

                <Typography variant="body2">
                  Sold: <b>{product.soldCount}</b>
                </Typography>

                <Typography variant="body2">
                  Earnings: <b>${product.earnings}</b>
                </Typography>

                {product.employee && (
                  <div className="flex items-center gap-2 mt-2">
                    <Avatar src={product.employee.image?.url} />
                    <Typography variant="body2">
                      {product.employee.name.first} {product.employee.name.last}
                    </Typography>
                  </div>
                )}
                <div
                  className=" w-full flex flex-row-reverse font-bold text-xs"
                  style={{ color: DARK_MODE.Accent }}
                >
                  {new Date(product?.createdAt).toLocaleString()}
                </div>
                {product.status === "Sold-Out" && (
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete Sold-Out
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {/* Pagination */}
      <div style={titleTheme} className="flex justify-center mt-8">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
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

export default AdminProductsAnalytics;
