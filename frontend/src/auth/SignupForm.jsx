import { sendOtp } from "@/apiServices/apiHandlers/authAPI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { setSignupData } from "@/redux/authSlice";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignupForm = () => {

  
  

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

 const [formData,setFormData]= useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
 })


 const { firstName, lastName, email, password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData)=>({
        ...prevData,
        [e.target.name]:e.target.value,
    }))
  };

  const handleOnSubmit = (e)=>{
    e.preventDefault();
    if(password != confirmPassword){
        toast.error("Passwords do not match");
        return;
    }
    const signupData={
        ...formData,
    }

    

    //set signup data to state
    dispatch(setSignupData(signupData));

    dispatch(sendOtp(formData.email,navigate));

    setFormData({
        firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
  }


  return (
    <div className="max-w-md mx-auto pb-8 bg-white ">
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-full">
            <p className="mb-1 text-lg">
              First Name <sup className="text-red-500">*</sup>
            </p>
            <Input
              required
              type="text"
              name="firstName"
               value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
            />
          </label>

          <label className="w-full">
            <p className="mb-1 text-lg">
              Last Name <sup className="text-red-500">*</sup>
            </p>
            <Input
              required
              type="text"
              name="lastName"
               value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
            />
          </label>
        </div>

        <label className="w-full">
          <p className="mb-1 text-lg">Email Address</p>
          <Input
            required
            type="text"
            name="email"
             value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
          />
        </label>

        <div className="flex gap-4">

          <label  className="relative w-full">
            <p className="mb-1 text-lg">
              Create Password <sup className="text-red-500">*</sup>
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
             className="absolute right-3 top-[38px] z-[10] cursor-pointer">
              {showPassword ?  <Eye/> :   <EyeOff/> }
            </span>
          </label>


          <label className="relative w-full">
            <p className="mb-1 text-lg">
              Confirm Password <sup className="text-red-500">*</sup>
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
             className="absolute right-3 top-[38px] z-[10] cursor-pointer">
            {showConfirmPassword ? <EyeOff/> : <Eye/> }
            </span>
          </label>        

        </div>

        <Button type="submit" className="bg-black text-white mt-4">Create Account</Button>
        
      </form>
    </div>
  );
};

export default SignupForm;

