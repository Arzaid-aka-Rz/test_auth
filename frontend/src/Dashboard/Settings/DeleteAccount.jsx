import { deleteProfile } from "@/apiServices/apiHandlers/SettingsAPI";
import { Button } from "@/components/ui/button";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    try {
      dispatch(deleteProfile(token, navigate));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <div className="bg-black text-white  rounded-lg shadow-lg mt-10">
      <div className="flex items-center gap">
        <h2 className="text-2xl font-semibold">Delete Account</h2>
   
      </div>
      <p className="mt-2 mb-2">
        Are you sure you want to delete your account? This action cannot be undone.
      </p>
      <Button
        type="button"
        onClick={handleDeleteAccount}
        className=" text-white  w-full"
      >
        I want to delete my account.
      </Button>
    </div>
  );
};

export default DeleteAccount;
