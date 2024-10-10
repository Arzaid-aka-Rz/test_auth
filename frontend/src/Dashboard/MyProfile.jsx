import { formattedDate } from "@/data/formattedDate";
import { EditIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);

  return (
    <>
      <h1 className="mb-5 mt-10 text-3xl font-medium">My Profile</h1>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        <Link
          to="/dashboard/settings"
          className="text-gray-500 hover:text-blue-500"
        >
          <EditIcon />
        </Link>
      </div>

      <div className="mb-4">
        <p className="font-medium">About</p>
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
            className="text-gray-500 hover:text-blue-500"
          >
            <EditIcon />
          </Link>
        </div>
      </div>

      <div className="mb-4">
        <p className="font-medium">Personal Details</p>
        <div className="space-y-2">
          <div className="flex justify-between">
            <p>First Name</p>
            <p>{user?.firstName}</p>
          </div>

          <div className="flex justify-between">
            <p>Last Name</p>
            <p>{user?.lastName}</p>
          </div>

          <div className="flex justify-between">
            <p>Email</p>
            <p>{user?.email}</p>
          </div>

          <div className="flex justify-between">
            <p>Gender</p>
            <p>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
          </div>

          <div className="flex justify-between">
            <p>Phone Number</p>
            <p>
              {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Date Of Birth</p>
            <p>
              {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                "Add Date Of Birth"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
