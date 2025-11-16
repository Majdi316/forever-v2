//TODO Libraries
import crypto from "crypto";
//TODO Models
import { User } from "../models/User.js";
import LoginAttempt from "../models/LoginAttempt.js";
//TODO Import Functions
import { comparePassword, generatePassword } from "../helpers/bcrypt.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../resend/email.js";
import { getUserByEmail } from "../services/users/userDataService.js";
import { createNewUserService } from "../services/users/userService.js";
import { generateJWTToken } from "../utils/generateJWTToken.js";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";

/**-------------------------------------------------
 * @desc  Test Users Route
 * @route  /auth/test
 * @method  GET
 * @access public
 ---------------------------------------------------*/
const testServer = async (req, res) => {
  res.status(200).send("Server is Working successfully....");
};
/**-------------------------------------------------
 * @desc  Create New User
 * @route  /auth/signup
 * @method  POST
 * @access public
 ---------------------------------------------------*/
//todo------------------ Create New User --------------------------
const createNewUserController = async (req, res) => {
  try {
    const newUser = req.body;
    //!--------generate verification Token-------------
    const verificationToken = generateVerificationToken();

    const userAlreadyExist = await getUserByEmail(newUser.email);
    if (userAlreadyExist) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists !!" });
    }

    const user = await createNewUserService(newUser, verificationToken);

    //!----- generate JWT token and send it back to the client in a cookie -----
    generateJWTToken(res, user);
    //!------- send verification Email -------
    await sendVerificationEmail(user.email, verificationToken);
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
/**-------------------------------------------------
 * @desc  Verify Email
 * @route  /auth/verify-email
 * @method  POST
 * @access public
 ---------------------------------------------------*/
//todo------------------ Verify Email --------------------------
const verifyEmailController = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    await sendWelcomeEmail(user.email, user.name);
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
/**-------------------------------------------------
 * @desc  Login
 * @route  /auth/login
 * @method  POST
 * @access public
 ---------------------------------------------------*/
//todo------------------ Login --------------------------
const loginController = async (req, res) => {
  const { email, password } = req.body;
  const attempt = await LoginAttempt.findOne({ email });
  //! check if the user finished block time or not
  if (attempt && attempt.blockedUntil && attempt.blockedUntil > new Date()) {
    const minutesLeft = Math.ceil((attempt.blockedUntil - Date.now()) / 60000);
    return res.status(403).json({
      success: false,
      message: `Too many failed attempts. Try again in ${minutesLeft} minute(s).`,
    });
  }

  try {
    //! check if user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found !!!",
      });
    }
    //! check if password is correct
    const isPasswordValid = comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Incorrect Password !!!!");
    }
    //! check if email is verified
    const isVerified = user.isVerified;
    if (!isVerified) {
      throw new Error("Email not verified !!!");
    }

    //! check if email is Blocked
    const isBlocked = user.isBlocked;
    if (isBlocked) {
      throw new Error("Email has been Blocked by Manager !!!");
    }

    const token = generateJWTToken(res, user);
    //! reset number of tries
    await LoginAttempt.findOneAndDelete({ email });

    user.lastLogin = new Date();
    const userAfterUpdate = await User.findByIdAndUpdate(user._id, user, {
      new: true,
    });
    await user.save();
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    //! initial attempt
    if (!attempt) {
      await LoginAttempt.create({ email, count: 1 });
    } else {
      //! increment attempt count by one and change the last attempt
      attempt.count += 1;
      attempt.lastAttemptAt = new Date();
      //! if the user have more than 3 attempt then block it
      if (attempt.count >= 3) {
        attempt.blockedUntil = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
      }
      //! save the data in mongoose
      await attempt.save();
    }
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**-------------------------------------------------
 * @desc  Logout
 * @route  /auth/logout
 * @method  POST
 * @access public
 ---------------------------------------------------*/
//todo------------------ Logout --------------------------
const logoutController = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
/**-------------------------------------------------
 * @desc  Forgot Password
 * @route  /auth/forgot-password
 * @method  POST
 * @access public
 ---------------------------------------------------*/
//todo------------------ Forgot Password --------------------------
const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  try {
    //! check if user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    //! Generate reset token
    const resetPasswordToken = crypto.randomBytes(32).toString("hex");
    //! Expire date for the reset token (1 hour from now)
    const resetPasswordExpiresAt = Date.now() + 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpiresAt = resetPasswordExpiresAt;
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`
    );
    //! Save the reset token and expiration time to the user document
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**-------------------------------------------------
 * @desc  Reset Password
 * @route  /auth/reset-password/:token
 * @method  POST
 * @access public
 ---------------------------------------------------*/
//todo------------------ Reset Password --------------------------
const resetPasswordController = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }
    //! Hash the new password
    const hashedPassword = generatePassword(password);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    //! Send reset success email
    await sendResetSuccessEmail(user.email);

    //! Save the updated user document
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
/**-------------------------------------------------
 * @desc  Check Auth
 * @route  /auth/check-auth
 * @method  Get
 * @access public
 ---------------------------------------------------*/
//todo------------------ Check Token --------------------------
const checkAuthController = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User is authenticated",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export {
  testServer,
  createNewUserController,
  verifyEmailController,
  loginController,
  logoutController,
  forgotPasswordController,
  resetPasswordController,
  checkAuthController,
};
