import mongoose from "mongoose";
import mailSender from "../utils/mailSender.js";
import emailVerificationTemplate from "../mail/templates/emailVerificationTemplate.js";


const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 24 * 60 * 60, // OTP expires after 24 hours
  },
});


//function for sending emails
async function sendVerificationEmail(email, otp) {
    try{
        const mailResponse = await mailSender(email,
             "Verification EMAIL from Arzaid Website",
             emailVerificationTemplate(otp));
        console.log("Email sent Successfully! => ", mailResponse);
    } catch(error) {
        console.log("Error while sending Email", error);
        throw error;
    }
}

OTPSchema.pre("save", async function(next) {
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
} )


export const OTP = mongoose.model("OTP", OTPSchema);
