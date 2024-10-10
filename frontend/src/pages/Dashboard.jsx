import Sidebar from "@/Dashboard/Sidebar";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);

  if (profileLoading || authLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className=" container flex bg-black min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
