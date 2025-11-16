//TODO Libraries
import { useContext, useEffect, useState } from "react";
//TODO Context
import { UserContext } from "../context/UserContext";
// TODO Assets
import { assets } from "../assets/assets";
//TODO Components
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";
//TODO Theme
import { DARK_MODE, LIGHT_MODE } from "../theme/themeData";

//TODO MainFunction
const Collection = () => {
  //TODO Variables
  const { search, showSearch, theme, products } = useContext(UserContext);
  //TODO State
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");
  //TODO Functions
  //------------- Toggle Category -------------
  const toggleCategory = (e) => {
    //! check if category already exists if yes remove it else add it
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  //------------- Toggle SubCategory -------------
  const toggleSubCategory = (e) => {
    //! check if subCategory already exists if yes remove it else add it
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };
  //------------- Filter Product -------------
  const applyFilter = () => {
    let productsCopy = products.slice();
    //! search filter
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    //! category filter
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    //! subCategory filter
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProducts(productsCopy);
  };
  //------------- Sort Product -------------
  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };
  //TODO useEffect
  useEffect(() => {
    applyFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, subCategory, search, showSearch, products, showFilter]);
  useEffect(() => {
    sortProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);
  //TODO Return
  return (
    <div className="flex flex-col sm:flex-row gap-8 pt-10 px-4 sm:px-8 lg:px-16 min-h-screen">
      {/* Sidebar Filters */}
      <aside className="sm:w-64 w-full sm:sticky sm:top-20 rounded-2xl shadow-sm p-5">
        {/* Filter Header */}
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowFilter(!showFilter)}
        >
          <h2
            style={{
              color:
                theme === "dark"
                  ? DARK_MODE.TextPrimary
                  : LIGHT_MODE.TextPrimary,
            }}
            className="text-lg font-semibold "
          >
            Filters
          </h2>
          <img
            src={assets.dropdown_icon}
            alt="dropdown"
            className={`h-4 transform transition-transform duration-300 sm:hidden ${
              showFilter ? "rotate-90" : ""
            }`}
          />
        </div>

        {/* Filters Container */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            showFilter ? "max-h-[1000px]" : "max-h-0 sm:max-h-none"
          }`}
        >
          {/* Category */}
          <div className="mt-6">
            <p
              style={{
                color:
                  theme === "dark"
                    ? DARK_MODE.TextPrimary
                    : LIGHT_MODE.TextPrimary,
              }}
              className="text-sm font-medium  mb-3"
            >
              Categories
            </p>
            <div
              style={{
                color:
                  theme === "dark"
                    ? DARK_MODE.TextSecondary
                    : LIGHT_MODE.TextSecondary,
              }}
              className="space-y-2 text-sm"
            >
              {["Men", "Women", "Kids"].map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={cat}
                    onChange={toggleCategory}
                    className="accent-gray-800"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Subcategory */}
          <div className="mt-6">
            <p
              style={{
                color:
                  theme === "dark"
                    ? DARK_MODE.TextPrimary
                    : LIGHT_MODE.TextPrimary,
              }}
              className="text-sm font-medium  mb-3"
            >
              Type
            </p>
            <div
              style={{
                color:
                  theme === "dark"
                    ? DARK_MODE.TextSecondary
                    : LIGHT_MODE.TextSecondary,
              }}
              className="space-y-2 text-sm "
            >
              {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={type}
                    onChange={toggleSubCategory}
                    className="accent-gray-800"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Products Section */}
      <section className="flex-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <Title text1="All" text2="Collections" />
          <select
            style={{
              color:
                theme === "dark"
                  ? DARK_MODE.TextPrimary
                  : LIGHT_MODE.TextPrimary,
              background:
                theme === "dark" ? DARK_MODE.Secondary : LIGHT_MODE.Secondary,
            }}
            onChange={(e) => setSortType(e.target.value)}
            className="border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem key={index} product={item} />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              No products found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Collection;
