import { User } from "../models/user.model.js";
import { OTP } from "../models/otp.model.js";
import { Profile } from "../models/profile.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateUniqueOTP } from "../utils/generateUniqueOTP.js";
import mailSender from "../utils/mailSender.js";
import passwordUpdated from "../mail/templates/passwordUpdated.js";
import crypto from "crypto";

//otp verification by SENDING OTP
export const sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(403).json({
        message: "Email field is required",
        success: false,
      });
    }

    //check if user already present
    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User Already Exists. Please Log In to Continue.",
      });
    }

    //Generate otp
    const otp = await generateUniqueOTP();

    //create otpPayload
    const otpPayload = { email, otp };

    //create entry in OTP database
    const otpBody = await OTP.create(otpPayload);

    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully!",
    });
  } catch (error) {
    console.error("Error while sending OTP:", error); // Log the error
    return res.status(500).json({
      success: false,
      message: "An error occurred while sending OTP. Please try again.",
    });
  }
};

export const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(400).json({
        message: "Please fill up All the required fields",
        success: false,
      });
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password do not match.",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User Already Exists. Please Log In to Continue.",
      });
    }

    // Find the most recent OTP for the email
    const recentOTP = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (recentOTP.length === 0) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== recentOTP[0].otp) {
      return res.status(400).json({
        success: false,
        message: "The OTP you entered is Wrong!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the Additional Profile For User
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(201).json({
      success: true,
      user,
      message: "User Registered Successfully !",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be Registered. Please try again.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill up all the required fields.",
        success: false,
      });
    }

    // Check User existence
    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered. Please sign Up first.",
      });
    }

    //Match Password and Generate JWT Token
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, role: user.role },
        process.env.SECRET_KEY,
        {
          expiresIn: "24h",
        }
      );

      // Save token to user document in database
      user.token = token;
      user.password = undefined;

      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Logged in successfully!`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be logged in. Please try again.",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { oldPassword, newPassword } = req.body;

    //validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password for your account has been updated",
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      );
    } catch (error) {
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    return res
      .status(200)
      .json({
        success: true,
        message:
          "Password updated successfully! Please check your email for confirmation.",
      });
  } catch (error) {
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};

export const resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({
        message: "Email field is required",
        success: false,
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `This Email: ${email} is not registered with us. Please enter a valid email.`,
      });
    }

    const token = crypto.randomBytes(20).toString("hex");
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000, // Token expires in 1 hour
      },
      { new: true }
    );
    // const url = `http://localhost:5173/update-password/${token}`;
    const url = `${process.env.FRONTEND_URL}/update-password/${token}`;


    await mailSender(
      email,
      "Password Reset",
      `Your Link for password reset is ${url}. Please click this url to reset your password.`
    );

    return res.json({
      success: true,
      message:
        "Email Sent Successfully, Please Check Your Email to Continue Further",
    });
  } catch (error) {
    console.error("Error while sending password reset link:", error);
    return res.status(500).json({
      error: error.message,
      success: false,
      message:
        "Facing error while sending the password reset link. Please try again.",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;
    if (confirmPassword !== password) {
      return res.json({
        success: false,
        message: "Password and Confirm Password do not match.",
      });
    }

    const userDetails = await User.findOne({ token: token });
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is Invalid",
      });
    }

    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: `Token is Expired, Please Regenerate Your Token`,
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { token: token },
      { password: encryptedPassword, token: null, resetPasswordExpires: null },
      { new: true }
    );
    res.json({
      success: true,
      message: `Password Reset Successful`,
    });
  } catch (error) {
    console.error("Error while updating the password:", error); // Log the error
    return res.status(500).json({
      error: error.message,
      success: false,
      message: "An error occurred while updating the password.",
    });
  }
};

// export const logout = async (req, res) => {
//   try {

//     // Clear the cookie by setting it to an expired date
//     res.cookie("token", "", { expires: new Date(0), httpOnly: true });

//     return res.status(200).json({
//       success: true,
//       message: "User logged out successfully.",
//     });
//   } catch (error) {
//     console.error("Error during logout:", error);
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred during logout. Please try again.",
//     });
//   }
// };



