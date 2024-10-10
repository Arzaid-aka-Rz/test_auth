import { resetPassword } from "@/apiServices/apiHandlers/authAPI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    password:"",
    confirmPassword:"",
  })
  const {password,confirmPassword}= formData;

  const handleOnChange = (e)=>{
    setFormData((prevData)=>({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }

  
  const handleOnSubmit = (e) =>{
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password,confirmPassword,token,navigate))
  }


  return (
<div className="container">


    {
      loading? (<div>Loading...</div>):(
        <div >
        <h1>Choose your password</h1>
  
        <form onSubmit={handleOnSubmit} className="mt-5 flex flex-col gap-4">
          <label className="relative">
            <p>
              New Password <sup>*</sup>
            </p>
            <Input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? <EyeIcon /> : <EyeOff />}
            </span>
          </label>
  
          <label className="relative ">
            <p>
              Confirm New Password <sup>*</sup>
            </p>
            <Input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? <EyeIcon /> : <EyeOff />}
            </span>
          </label>
  
          <Button type="submit" className="bg-black">
            Reset Password
          </Button>
        </form>
  
        <div>
          <Link to="/login">
            <p>
              <ArrowLeft /> Back To Login
            </p>
          </Link>
        </div>
      </div>
      )
    }
  </div>
  );
};

export default UpdatePassword;
