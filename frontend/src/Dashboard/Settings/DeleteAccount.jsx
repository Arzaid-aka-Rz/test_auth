import { deleteProfile } from "@/apiServices/apiHandlers/SettingsAPI";
import { Button } from "@/components/ui/button"
import { Delete } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate();

  const handleDeleteAccount =()=>{
    try {
      dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    <div>
     <Delete/>
     <h2>Delete Account</h2>
     <p>Would you like to delete your account?</p>
     <Button type="button" onClick={handleDeleteAccount}>
     I want to delete my account.
     </Button>
    </div>
  )
}

export default DeleteAccount
