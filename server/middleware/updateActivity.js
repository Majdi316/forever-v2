import { User } from "../models/User.js";

export const updateUserActivity = async (req, res, next) => {
  if (!req.user) return next();
  await User.findByIdAndUpdate(req.user._id, { lastActivity: new Date() });
  next();
};
