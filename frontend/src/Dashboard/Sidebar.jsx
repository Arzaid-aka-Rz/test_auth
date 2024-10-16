import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "@/apiServices/apiHandlers/authAPI";
import { useState } from "react";
import ConfirmationModal from "@/components/common/ConfirmationModal";

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (profileLoading || authLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  const sidebarLinks = [
    {
      id: 1,
      name: "My Profile",
      path: "/dashboard/my-profile",
      icon: "CircleUserRound",
    },
  ];

  return (
    <div className=" text-white w-64  mt-7 h-full flex flex-col">
      <div className="flex flex-col mb-4">
        {sidebarLinks.map((link) =>
          (link.type && user?.accountType !== link.type) ? null : (
            <SidebarLink key={link.id} link={link} iconName={link.icon} />
          )
        )}
      </div>

      <button
        onClick={() => setConfirmationModalOpen(true)}
        className="flex items-center gap-2"
      >
        <LogOut />
        <span>Logout</span>
      </button>

      <ConfirmationModal
        open={confirmationModalOpen}
        onOpenChange={setConfirmationModalOpen}
        text1="Are you sure?"
        text2="You will be logged out of your account."
        btn1Text="Logout"
        btn2Text="Cancel"
        btn1Handler={() => {
          dispatch(logout(navigate));
          setConfirmationModalOpen(false);
        }}
        btn2Handler={() => setConfirmationModalOpen(false)}
      />
    </div>
  );
};

export default Sidebar;
