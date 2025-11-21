//TODO Models
import Product from "../models/Product.js";
//TODO Controllers
/**-------------------------------------------------
 * @desc  Update Product
 * @route  /products/update/:id
 * @method  PUT
 * @access private (only user that created this product)
 ---------------------------------------------------*/
export const updateProductController = async (req, res) => {
  const user = req.user;
  try {
    const productId = req.params.id;
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      status,
      bestseller,
      image,
    } = req.body;

    //! Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    //!only same user that create the product can update it
    if(user._id !== product.employee_id )
    {
      return res.status(403).json({
        success:false,
        message:"Only user that added this product can modify it."
      })
    }

    //! Update fields
    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.category = category ?? product.category;
    product.subCategory = subCategory ?? product.subCategory;
    product.sizes = sizes ?? product.sizes;
    product.status = status ?? product.status;
    product.bestseller = bestseller ?? product.bestseller;

    // Images (must be array of `{url, alt}`)
    if (image) product.image = image;

    await product.save();

    res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
