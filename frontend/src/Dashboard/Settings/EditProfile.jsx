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
    <>
      <form onSubmit={handleSubmit(submitProfileForm)} className="mt-7">
        {/* Profile Information */}
        <div>
          <h2>Profile Information</h2>
          <div>
            <div>
              <label>
                First Name
                <Input
                  type="text"
                  name="firstName"
                  placeholder="Enter Your First Name"
                  {...register("firstName", { required: true })}
                  defaultValue={user?.firstName}
                />
              </label>
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-500">
                  Please enter your first name.
                </span>
              )}
            </div>

            <div>
              <label>
                Last Name
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Enter Your Last Name"
                  {...register("lastName", { required: true })}
                  defaultValue={user?.lastName}
                />
              </label>
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-500">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          <div>
            <div>
              <label>
                Date of Birth
                <Input
                  type="date"
                  name="dateOfBirth"
                  {...register("dateOfBirth", {
                    required: {
                      value: true,
                      message: "Please enter your Date of Birth.",
                    },
                    max: {
                      value: new Date().toISOString().split("T")[0],
                      message: "Date of Birth cannot be in the future.",
                    },
                  })}
                  defaultValue={user?.additionalDetails?.dateOfBirth}
                />
              </label>
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-500">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>

            <div>
              <label>
                Gender
                <select
               
                  name="gender"
                  {...register("gender", {
                    required: true,
                  })}
                  defaultValue={user?.additionalDetails?.gender}
                >
                  {genders.map((gender, i) => (
                    <option key={i} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </label>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-500">
                  Please select your gender.
                </span>
              )}
            </div>
          </div>

          <div>
            <div>
              <label>
                Contact Number
                <Input
                  type="tel"
                  name="contactNumber"
                  placeholder="Enter Contact Number"
                  {...register("contactNumber", {
                    required: {
                      value: true,
                      message: "Please enter your Contact Number.",
                    },
                    maxLength: {
                      value: 12,
                      message: "Contact Number cannot exceed 12 digits.",
                    },
                    minLength: {
                      value: 10,
                      message: "Contact Number must be at least 10 digits.",
                    },
                  })}
                  defaultValue={user?.additionalDetails?.contactNumber}
                />
              </label>
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-500">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>

            <div>
              <label>
                About
                <Input
                  type="text"
                  name="about"
                  placeholder="Enter Bio Details"
                  {...register("about", { required: true })}
                  defaultValue={user?.additionalDetails?.about}
                />
              </label>
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-500">
                  Please enter About you.
                </span>
              )}
            </div>
          </div>
        </div>

        <div>
          <Link className="cursor-pointer" to="/dashboard/my-profile">
            Cancel
          </Link>
        </div>

        <Button type="submit">Save</Button>
      </form>
    </>
  );
};

export default EditProfile;
