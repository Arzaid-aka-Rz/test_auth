import { getPasswordResetToken } from "@/apiServices/apiHandlers/authAPI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent))
  };

  return (
    <div className="container">
      {loading ? (
        <div> loading</div>
      ) : (
        <div>
          <h1>{!emailSent ? "  Reset your password" : "Check Email"}</h1>
          <p>
          {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>

          <form
          onSubmit={handleOnSubmit}
          className="mt-5 flex flex-col gap-5">
          {!emailSent && (
            <label>
              <p>
                Email Address <sup>*</sup>
              </p>
              <Input
                required
                type="email"
                name="email"
                value = {email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter your email address"
              />
            </label>
              )}

            <Button className="bg-black">{!emailSent ? "Sumbit" : "Resend Email"}</Button>

            
          </form>

          
          <div>
              <Link>
                <p className="flex items-center gap-x-2">
                  <ArrowLeft />
                  Back to Login
                </p>
              </Link>
            </div>


        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
