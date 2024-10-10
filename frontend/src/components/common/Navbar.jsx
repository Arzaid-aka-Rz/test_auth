import ProfileDropdown from "@/auth/ProfileDropdown";
import { Button } from "@/components/ui/button";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
 
  return (
    <header className="sticky top-0 backdrop-blur-sm z-20 text-white">
      <div className="py-5">
        <div className="container">
          <div className="flex items-center justify-between">
           
            <Link to="/">
              <h1 className="text-3xl font-bold uppercase tracking-tighter">
                Auth Flow
              </h1>
            </Link>

          
            {/* Login / Signup / Dashboard */}
            <div className="items-center gap-x-4 flex">
              {token === null && (
                <Link to="/login">
                  <Button  className="text-white border-2 text-base border-blue-600 rounded-md hover:bg-blue-600 duration-200">Login</Button>
                  
                </Link>
              )}
              {token === null && (
                <Link to="/signup">
                  <Button className="text-white text-base border-2 border-blue-600 rounded-md hover:bg-blue-600 duration-200">Sign up</Button>
                </Link>
              )}

              {token !==null &&
              <ProfileDropdown/>
              }
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
