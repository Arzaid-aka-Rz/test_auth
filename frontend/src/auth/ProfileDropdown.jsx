import { logout } from "@/apiServices/apiHandlers/authAPI";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowDown, CircleGauge, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ProfileDropdown = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

  const { user } = useSelector((state) => state.profile);
  if(!user) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <div className="flex items-center gap-x-1">
            <img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className="aspect-square w-[50px] rounded-full object-cover"
            />
            <ArrowDown />
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent>
        <Link to="/dashboard/my-profile">
          <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px]">
            <CircleGauge />
            Dashboard
          </div>
        </Link>

        <div
        onClick={()=>{
            dispatch(logout(navigate))
        }}
        className="flex w-full items-center gap-x-1 py-[10px] px-[12px] cursor-pointer ">
          <LogOut />
          Logout
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileDropdown;
