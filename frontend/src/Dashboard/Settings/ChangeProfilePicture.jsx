import { updateDisplayPicture } from "@/apiServices/apiHandlers/SettingsAPI";
import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ChangeProfilePicture = () => {
  const { user } = useSelector((state) => state.profile);
  const [previewSource, setPreviewSource] = useState(null);

  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const [imageFile, setImageFile] = useState(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // console.log(file)
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = () => {
    try {
      console.log("uploading...");
      setLoading(true);
      const formData = new FormData();
      formData.append("displayPicture", imageFile);
      // console.log("formdata", formData)
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])

  return (
    <>
      <div>
        <div>
          <img
            src={previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div>
            <p>Change Profile Picture</p>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />

              <Button onClick={handleClick} disabled={loading}>
                Select
              </Button>

              <Button onClick={handleFileUpload}>
                {loading ? "Uploading..." : "Upload"}
                {!loading && <File />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeProfilePicture;
