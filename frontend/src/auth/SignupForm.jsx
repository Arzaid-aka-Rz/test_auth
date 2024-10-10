import { sendOtp } from "@/apiServices/apiHandlers/authAPI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ACCOUNT_TYPE } from "@/data/constants";
import { setSignupData } from "@/redux/authSlice";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignupForm = () => {

    
  const tabData=[
    {
        id:1,
        tabName:"User",
        type:ACCOUNT_TYPE.USER,
    },
    {
        id:2,
        tabName:"Instructor",
        type:ACCOUNT_TYPE.INSTRUCTOR,
    }
  ]
  

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [accountType,setAccountType] = useState(ACCOUNT_TYPE.USER);

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
        accountType
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
    setAccountType(ACCOUNT_TYPE.USER)
  }


  return (
    <div className="container">
            <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-4">
        <div className="flex gap-x-64">
          <label>
            <p className="mb-1 text-xl  leading-3">
              First Name <sup>*</sup>
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

          <label>
            <p className="mb-1 text-xl  leading-3">
              Last Name <sup>*</sup>
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
          <p className="mb-1 text-xl  leading-3">Email Address</p>
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

          <label className="relative">
            <p className="mb-1 text-xl  leading-3 ">
              Create Password <sup>*</sup>
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
            className="absolute right-3 top-[25px] z-[10] cursor-pointer">
              {showPassword ?  <Eye/> :   <EyeOff/> }
            </span>
          </label>


          <label className="relative">
            <p className="mb-1 text-xl  leading-3 ">
              Confirm Password <sup>*</sup>
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
            className="absolute right-3 top-[25px] z-[10] cursor-pointer">
            {showConfirmPassword ? <EyeOff/> : <Eye/> }
            </span>
          </label>        

        </div>

        <Button type="submit" className="bg-black">Create Account</Button>
        
      </form>
    </div>
  );
};

export default SignupForm;

const Tab = ({ tabData, field, setField }) => {
    return (
      <div className="flex justify-center gap-4 mb-10">
        {tabData.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setField(tab.type)}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              field === tab.type
                ? "bg-blue-600 text-white shadow-lg transform scale-105"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {tab?.tabName}
          </Button>
        ))}
      </div>
    );
  };
  
