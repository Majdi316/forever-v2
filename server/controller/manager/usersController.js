import { User } from "../../models/User.js";

/**-------------------------------------------------
 * @desc    get top 5 active users
 * @route   /manager/top-active-users
 * @method  GET
 * @access  Private (Only Manager)
 --------------------------------------------------*/
 export const getTopActiveUsers = async (req, res) => {
  try {
    const registeredUser = req.user;

    //! Only manager can view this
    if (!registeredUser.isManager) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
//! fetch user data and sort it by last activity
    const users = await User.find()
      .sort({ lastActivity: -1 }) 
      .limit(5)
      .select(
        "name email image lastLogin lastActivity isEmployee"
      );

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};