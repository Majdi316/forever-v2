import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

export const generateJWTToken = (res, user) => {
  const token = jwt.sign(
    { _id: user.id, isManager: user.isManager, isEmployee: user.isEmployee },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });
  return token;
};
