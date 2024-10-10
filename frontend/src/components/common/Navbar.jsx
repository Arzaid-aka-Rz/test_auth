import ProfileDropdown from "@/auth/ProfileDropdown";
import { Button } from "@/components/ui/button";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
 
  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      <div className="py-5">
        <div className="container">
          <div className="flex items-center justify-between">
           
            <Link to="/">
              <h1 className="text-3xl font-bold uppercase tracking-tighter">
                Auth Flow
              </h1>
            </Link>

          
            {/* Login / Signup / Dashboard */}
            <div className="hidden items-center gap-x-4 md:flex">
              {token === null && (
                <Link to="/login">
                  <Button className="bg-black">Log in</Button>
                </Link>
              )}
              {token === null && (
                <Link to="/signup">
                  <Button className="bg-black">Sign up</Button>
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
