import { updateProfile } from "@/apiServices/apiHandlers/SettingsAPI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const genders = [
    "Male",
    "Female",
    "Non-Binary",
    "Prefer not to say",
    "Other",
  ];

  const submitProfileForm = async (data) => {
    try {
      dispatch(updateProfile(token, data));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitProfileForm)}
      className="space-y-4 bg-black text-white  "
    >
      {/* Profile Information */}
      <h2 className="text-xl font-semibold mb-4">Profile Information</h2>

      {/* First Name */}
      <div className="space-y-2">
        <label className="block text-white">
          First Name
          <Input
            type="text"
            name="firstName"
            placeholder="Enter Your First Name"
            {...register("firstName", { required: true })}
            defaultValue={user?.firstName}
            className="mt-1"
          />
        </label>
        {errors.firstName && (
          <span className="-mt-1 text-[12px] text-yellow-500">
            Please enter your first name.
          </span>
        )}
      </div>

      {/* Last Name */}
      <div className="space-y-2">
        <label className="block text-black">
          Last Name
          <Input
            type="text"
            name="lastName"
            placeholder="Enter Your Last Name"
            {...register("lastName", { required: true })}
            defaultValue={user?.lastName}
            className="mt-1"
          />
        </label>
        {errors.lastName && (
          <span className="-mt-1 text-[12px] text-yellow-500">
            Please enter your last name.
          </span>
        )}
      </div>

      {/* Date of Birth */}
      <div className="space-y-2">
        <label className="block text-black">
          Date of Birth
          <Input
            type="date"
            name="dateOfBirth"
            {...register("dateOfBirth", {
              required: { value: true, message: "Please enter your Date of Birth." },
              max: {
                value: new Date().toISOString().split("T")[0],
                message: "Date of Birth cannot be in the future.",
              },
            })}
            defaultValue={user?.additionalDetails?.dateOfBirth}
            className="mt-1"
          />
        </label>
        {errors.dateOfBirth && (
          <span className="-mt-1 text-[12px] text-yellow-500">
            {errors.dateOfBirth.message}
          </span>
        )}
      </div>

      {/* Gender (Side by Side) */}
      <div className="space-y-2">
        <label className="block ">Gender</label>
        <div className="flex gap-4">
          <select
            name="gender"
            {...register("gender", { required: true })}
            defaultValue={user?.additionalDetails?.gender}
            className="w-full p-2 text-black rounded-lg"
          >
            {genders.map((gender, i) => (
              <option key={i} value={gender}>
                {gender}
              </option>
            ))}
          </select>
          {errors.gender && (
            <span className="-mt-1 text-[12px] text-yellow-500">
              Please select your gender.
            </span>
          )}
        </div>
      </div>

      {/* Contact Number */}
      <div className="space-y-2">
        <label className="block ">
          Contact Number
          <Input
            type="tel"
            name="contactNumber"
            placeholder="Enter Contact Number"
            {...register("contactNumber", {
              required: { value: true, message: "Please enter your Contact Number." },
              maxLength: { value: 12, message: "Contact Number cannot exceed 12 digits." },
              minLength: { value: 10, message: "Contact Number must be at least 10 digits." },
            })}
            defaultValue={user?.additionalDetails?.contactNumber}
            className="mt-1"
          />
        </label>
        {errors.contactNumber && (
          <span className="-mt-1 text-[12px] text-yellow-500">
            {errors.contactNumber.message}
          </span>
        )}
      </div>

      {/* About */}
      <div className="space-y-2">
        <label className="block text-black">
          About
          <Input
            type="text"
            name="about"
            placeholder="Enter Bio Details"
            {...register("about", { required: true })}
            defaultValue={user?.additionalDetails?.about}
            className="mt-1"
          />
        </label>
        {errors.about && (
          <span className="-mt-1 text-[12px] text-yellow-500">
            Please enter details about you.
          </span>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <Link className="text-blue-400 hover:text-blue-600" to="/dashboard/my-profile">
          Cancel
        </Link>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
          Save
        </Button>
      </div>
    </form>
  );
};

export default EditProfile;
