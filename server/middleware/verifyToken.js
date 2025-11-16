import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Authentication Error: Please Login" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Authentication Error: Unauthorize user",
        });
    }
    req.userId = decoded.userId;
    next();
  } catch (error) { 
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};
