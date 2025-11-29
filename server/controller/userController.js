import { User } from "../models/User.js";
import { getUserByIdService } from "../services/users/userService.js";
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
//todo------------------ get user by id --------------------------
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

export { getUserByIdController, getUserDataController };
