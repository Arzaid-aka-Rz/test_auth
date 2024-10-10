import { sendOtp, signUp } from "@/apiServices/apiHandlers/authAPI";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { signupData,loading } = useSelector((state) => state.auth);
  const [otp , setOtp]=useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    // Only allow access of this route when user has filled the signup form
    if (!signupData) {
      navigate("/signup");
    }
  },[]);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(signUp(
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      otp,
      navigate
    ));

  };

  return (
    <div className="container mt-16">
      {loading ? (
        <div>
          <div>Loading...</div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-8 mx-4 sm:mx-auto max-w-md w-full">
          <h1 className=" text-2xl font-bold uppercase  text-center  mb-6">Verify Email</h1>
          <p className="text-xl  my-4 ">
            A verification code has been sent to you. Enter the code below
          </p>

          <form 
          className="flex flex-col gap-4"
          onSubmit={handleVerifyAndSignup}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-black rounded-[0.5rem] text-white aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />

            <Button
              type="submit"
              className="container bg-black py-[12px] px-[12px] rounded-[8px] mt-6 font-medium "
            >
              Verify Email
            </Button>
            
          </form>

          <div className="mt-6 flex items-center justify-between">
            <Link to="/signup">
              <p className=" flex items-center gap-x-2">
                <ArrowBigLeft /> Back To Signup
              </p>
            </Link>
            <button
              className="flex items-center gap-x-2"
              onClick={() => dispatch(sendOtp(signupData.email, navigate))}
            >
              <Timer />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
