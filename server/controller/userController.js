import { User } from "../models/User.js";
import { getUserByIdService } from "../services/users/userService.js";
const allowedUpdates = [
  "name",
  "phone",
  "email",
  "age",
  "gender",
  "image",
  "address",
  "password",
];
/**-------------------------------------------------
 * @desc  Get User By Id
 * @route  /users/:id
 * @method  Get
 * @access private (manager , user himself/herself)
 ---------------------------------------------------*/
//todo------------------ get user by id --------------------------
const getUserByIdController = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const user = req.user;

    //!---admin and registered user can show user information
    if (userId !== user?._id) {
      return res
        .status(403)
        .send("Only Admin or registered user can look at user information");
    }
    const result = await getUserByIdService(userId);
    if (!result) {
      return res.status(404).send("User Not Found");
    }
    res.status(200).send(result);
  } catch (error) {
    return res.status(404).send(error.message);
  }
};
/**-------------------------------------------------
 * @desc  Get User By Id
 * @route  /users/profile/:id
 * @method  Get
 * @access private (manager , user himself/herself)
 ---------------------------------------------------*/
//todo------------------ get user data by id --------------------------
const getUserDataController = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const user = req.user;

    //!---manager and registered user can show user information
    if (!user.isManger && userId !== user?._id) {
      return res.status(403).json({
        success: false,
        message: "Only Manager or registered user can look at user information",
      });
    }
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "Not found user",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Fetch Data Successfully...",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};
/**-------------------------------------------------
 * @desc  Toggle subscription status
 * @route  /users/subscribe
 * @method  PUT
 * @access private (Only Registered user)
 ---------------------------------------------------*/

const toggleSubscribeController = async (req, res) => {
  try {
    const userId = req.user._id;
    //!check if user is exist
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //! Toggle the subscription
    user.isSubscribe = !user.isSubscribe;
    await user.save();

    res.status(200).json({
      message: user.isSubscribe
        ? "Subscribed successfully!"
        : "Unsubscribed successfully!",
      isSubscribe: user.isSubscribe,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
/**-------------------------------------------------
 * @desc    Update User Details
 * @route   /users/update/:id
 * @method  PUT
 * @access  Private (Same user)
 --------------------------------------------------*/
const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const userFromToken = req.user;

    if (userFromToken._id !== id) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const updates = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while updating user",
    });
  }
};

export {
  getUserByIdController,
  getUserDataController,
  toggleSubscribeController,
  updateUserController,
};
