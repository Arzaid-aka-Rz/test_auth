import { changePassword } from "@/apiServices/apiHandlers/SettingsAPI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UpdatePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  const { register,
    handleSubmit,
    formState: { errors },
   } = useForm();

   const submitPasswordForm = async (data) => {
    try {
     dispatch(changePassword(token, data));

    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };


  return (
    <>
      <form  
      onSubmit={handleSubmit(submitPasswordForm )}
      className="mt-10">
        <h2>Password</h2>
        <div>

          <div>
            <label>
              Current Password
              <Input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                placeholder="Enter Current Password"
                {...register("oldPassword", { required: true })}
              />
              <span onClick={() => setShowOldPassword((prev) => !prev)}>
                {showOldPassword ? <Eye /> : <EyeOff />}
              </span>
            </label>
            {errors.oldPassword && (
            <span>Please enter your Current Password.</span>
          )}
          </div>
          
          <div>
            <label>
              New Password
              <Input
                type={showNewPassword  ? "text" : "password"}
                name="newPassword"
                placeholder="Enter New  Password"
                {...register("newPassword", { required: true })}
              />
              <span onClick={() => setShowNewPassword((prev) => !prev)}>
                {showNewPassword  ? <Eye /> : <EyeOff />}
              </span>
            </label>
            {errors.newPassword  && (
            <span>Please enter your New Password.</span>
          )}
          </div>

          <div>
            <Link to="/dashboard/my-profile">Cancel</Link>

            <Button type="submit">Update</Button>
          </div>
          
        </div>
      </form>
    </>
  );
};

export default UpdatePassword;
