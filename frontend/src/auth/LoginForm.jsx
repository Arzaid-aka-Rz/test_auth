import { login } from "@/apiServices/apiHandlers/authAPI"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

const LoginForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData

  const [showPassword, setShowPassword] = useState(false)



  const handleOnChange=(e)=>{
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))


  }

  const handleOnSubmit = (e)=>{
    e.preventDefault()
    dispatch(login(email, password, navigate));
  }

  return (
    <div className="container">

<form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-4">



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
      Password <sup>*</sup>
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

  <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs">
            Forgot Password
          </p>
        </Link>
    

</div>

<Button type="submit" className="bg-black mt-6 ">Log In</Button>

</form>
</div>
  )
}

export default LoginForm
