import { formattedDate } from "@/data/formattedDate";
import { EditIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="flex flex-col gap-4 text-white ">
      <h1 className="text-white text-3xl font-medium mb-4">My Profile</h1>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-white">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-gray-400">{user?.email}</p>
          </div>
        </div>

        <Link
          to="/dashboard/settings"
          className="text-gray-400 hover:text-blue-500"
        >
          <EditIcon />
        </Link>
      </div>

      <div className="mb-4">
        <p className="font-medium text-white">About</p>
        <div className="flex items-center justify-between">
          <p
            className={`${
              user?.additionalDetails?.about
                ? "text-yellow-500"
                : "text-blue-500"
            } text-sm`}
          >
            {user?.additionalDetails?.about ?? "Write Something About Yourself"}
          </p>
          <Link
            to="/dashboard/settings"
            className="text-gray-400 hover:text-blue-500"
          >
            <EditIcon />
          </Link>
        </div>
      </div>

      <div className="mb-4">
        <p className="font-medium text-white">Personal Details</p>
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-white">First Name</p>
            <p className="text-white">{user?.firstName}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-white">Last Name</p>
            <p className="text-white">{user?.lastName}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-white">Email</p>
            <p className="text-white">{user?.email}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-white">Gender</p>
            <p className="text-white">{user?.additionalDetails?.gender ?? "Add Gender"}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-white">Phone Number</p>
            <p className="text-white">
              {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-white">Date Of Birth</p>
            <p className="text-white">
              {formattedDate(user?.additionalDetails?.dateOfBirth) ?? "Add Date Of Birth"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
