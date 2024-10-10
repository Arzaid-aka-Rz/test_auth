import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.body.token
    || req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something Went Wrong While Validating the Authentication Token",
    });
  }
};

export const isUser = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });
    if (userDetails.accountType !== "User") {
      return res.status(401).json({
        success: false,
        message: "This is a Protected Route for User",
      });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `User Role Can't be Verified` });
  }
};


export const isAdmin = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};
