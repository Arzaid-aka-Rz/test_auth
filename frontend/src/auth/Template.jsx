import { useSelector } from "react-redux";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

const Template = ({ title, formType }) => {
  const { loading } = useSelector((state) => state.auth);
  return (
    <div>
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <div className="container">
          <div className="flex flex-col gap-y-12 py-12">
            <h1 className="text-4xl font-semibold leading-3">{title}</h1>
            
            {
                formType==="signup" ? <SignupForm/> :<LoginForm/>
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default Template;
