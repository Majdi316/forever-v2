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
      .select("name email image lastLogin lastActivity isEmployee");

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
/**-------------------------------------------------
 * @desc    update status of user
 * @route   /manager/update-status/:userId
 * @method  PUT
 * @access  Private (Only Manager)
 --------------------------------------------------*/
export const updateUserStatus = async (req, res) => {
  try {
    const manager = req.user;

    // Only managers can update
    if (!manager.isManager) {
      return res.status(403).json({
        success: false,
        message: "Access denied, only managers can update users.",
      });
    }

    const { userId } = req.params;
    const { isEmployee, isBlocked } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Prevent updating another manager
    if (user.isManager) {
      return res.status(403).json({
        success: false,
        message: "You cannot update another manager",
      });
    }

    // Update only the allowed fields
    if (typeof isEmployee === "boolean") user.isEmployee = isEmployee;
    if (typeof isBlocked === "boolean") user.isBlocked = isBlocked;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
