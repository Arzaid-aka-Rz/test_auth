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
      className="mt-10 ">
        <h2 className="text-2xl mb-4">Change Your Password</h2>
        <div className="flex flex-col gap-2" >

          <div  className="flex gap-4">
            <label className="relative w-full">
              <p className="mb-1 text-lg">

              Current Password
              </p>
              <Input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                placeholder="Enter Current Password"
                {...register("oldPassword", { required: true })}
                className="text-black"
              />
              <span
              className="absolute right-3 top-[38px] z-[10] text-black cursor-pointer "
              onClick={() => setShowOldPassword((prev) => !prev)}>
                {showOldPassword ? <Eye /> : <EyeOff />}
              </span>
            </label>
            {errors.oldPassword && (
            <span>Please enter your Current Password.</span>
          )}
          </div>
          
          <div>
            <label className="relative w-full">
              <p className="mb-1 text-lg">

              New Password
              </p>
              <Input
                type={showNewPassword  ? "text" : "password"}
                name="newPassword"
                placeholder="Enter New  Password"
                {...register("newPassword", { required: true })}
                className="text-black"
              />
              <span onClick={() => setShowNewPassword((prev) => !prev)}
                      
              className="absolute right-3 top-[38px] z-[10] text-black cursor-pointer ">
                {showNewPassword  ? <Eye /> : <EyeOff />}
              </span>
            </label>
            {errors.newPassword  && (
            <span>Please enter your New Password.</span>
          )}
          </div>

          <div className="flex gap-4 mt-3 items-center">
            <Link to="/dashboard/my-profile">Cancel</Link>

            <Button type="submit">Update</Button>
          </div>
          
        </div>
      </form>
    </>
  );
};

export default UpdatePassword;
