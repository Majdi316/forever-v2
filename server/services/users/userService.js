//TODO Libraries
import _ from "lodash";
//TODO Import Functions
import { generatePassword } from "../../helpers/bcrypt.js";
import { createNewUser, getUserById } from "./userDataService.js";
import { validateUser } from "../../validation/service/registerService.js";

//todo------------------ Create New User --------------------------
const createNewUserService = async (user, verificationToken) => {
  try {
    let hashPassword = generatePassword(user.password);
    //!--------validate user before creation-------------
    const { error } = validateUser(user);
    if (error) {
      throw new Error(`Validation failed: ${error.details[0].message}`);
    }
    //!-------- create initial image and alt placeholder -------
    if (user.image.url === "") {
      if (user.gender === "male") {
        user.image.url = "https://avatar.iran.liara.run/public/9";
      } else {
        user.image.url = "https://avatar.iran.liara.run/public/76";
      }
    }
    if (user.image.alt === "") {
      user.image.alt = "User Profile Image";
    }
    //! --------- create New User -----------
    const newUser = await createNewUser({
      ...user,
      password: hashPassword,
      verificationToken: verificationToken,
      // after 24 hours
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};
//todo------------------get user by id --------------------------
const getUserByIdService = async (id) => {
  try {
    const user = await getUserById(id);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
export { createNewUserService, getUserByIdService };
