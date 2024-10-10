import { login } from "@/apiServices/apiHandlers/authAPI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <div className="max-w-md mx-auto pb-8 bg-white ">
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
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
          <label className="relative w-full">
            <p className="mb-1 text-lg">
              Password <sup className="text-red-500">*</sup>
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
              {showPassword ? <Eye /> : <EyeOff />}
            </span>
          </label>
        </div>

        <Link to="/forgot-password">
            <p className="mt-1 ml-auto max-w-max text-xs">Forgot Password</p>
          </Link>

        <Button type="submit" className="bg-black text-white mt-4">
          Log In
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
