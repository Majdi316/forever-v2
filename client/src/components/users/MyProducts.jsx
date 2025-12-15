//TODO Libraries
import { useContext } from "react";
//TODO MUI Components
import {
  Card,
  CardContent,
  Typography,
  Rating, 
  Chip,
  Button,
} from "@mui/material";
//TODO Context
import { UserContext } from "../../context/UserContext";
//TODO Theme
import { DARK_MODE, LIGHT_MODE } from "../../theme/themeData";
//TODO Components
import Title from "../Title";
//TODO Main Components
const MyProducts = ({ data }) => {
  //TODO Variables
  const { buttonTheme, titleTheme, navigate, paperTheme, theme } =
    useContext(UserContext);
  //TODO Return if not have products
  if (!data?.products?.length) {
    return (
      <div className="w-full max-w-5xl mt-6 text-center bg-white rounded-xl shadow p-6">
        <Typography variant="h6" className="text-gray-500">
          You have not posted any Product yet.
        </Typography>
      </div>
    );
  }
  //TODO Return
  return (
    <div className="w-full max-w-5xl mt-8">
      <div className=" text-2xl">
        <Title text1={"PRODUCTS"} text2={data.totalProducts} />
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.products.map((product) => (
          <div
            key={product._id}
            className=" cursor-pointer"
            onClick={() => navigate(`/products/product-info/${product._id}`)}
          >
            <Card
              key={product._id}
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
                src={product.image[0].url}
                alt={product.image[0].alt}
                className="w-full h-52 object-cover rounded-t-2xl"
              />
              <CardContent className="p-4 flex flex-col gap-2">
                {/* Product Name */}
                <Typography sx={titleTheme} className="font-bold line-clamp-2">
                  {product.name}
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
                    label={product.category}
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
                    label={product.subCategory}
                    size="small"
                  />
                </div>

                {/* Price & Status */}
                <div className="flex justify-between items-center mt-1">
                  <Typography className="font-semibold text-green-600">
                    ${product.price}
                  </Typography>
                  <Chip
                    label={product.status}
                    color={product.status === "Available" ? "success" : "error"}
                    size="small"
                  />
                </div>
                <Typography variant="body2">
                  Reviews: {product.reviewCount}
                </Typography>
                <Rating
                  className=" rounded-2xl bg-amber-50 p-1 my-1"
                  name="read-only"
                  value={product.averageRating}
                  readOnly
                  precision={0.5}
                  size="small"
                />
                <p>{product.averageRating * 20}%</p>
                <p>💘 {product.likes.length}</p>
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
                  {new Date(product.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <div className=" w-full flex items-center justify-center mt-10">
        <Button
          className=" w-full sm:w-lg"
          sx={buttonTheme}
          onClick={() => navigate(`/employee/my-products`)}
        >
          all my product
        </Button>
      </div>
    </div>
  );
};

export default MyProducts;
