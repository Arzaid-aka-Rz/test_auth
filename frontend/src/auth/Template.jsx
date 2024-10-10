import { useSelector } from "react-redux";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

const Template = ({ title, formType }) => {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col min-h-screen  mt-8"> 
      <div className="flex-grow flex items-start justify-center py-12"> 
        {loading ? (
          <div className="text-lg font-semibold">Loading...</div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-8 mx-4 sm:mx-auto max-w-md w-full">

            <h1 className=" text-2xl font-bold uppercase  text-center  mb-6">{title}</h1>
            
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Template;
