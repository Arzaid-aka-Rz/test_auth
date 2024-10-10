import Sidebar from "@/Dashboard/Sidebar"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

const Dashboard = () => {
  
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div className="container">
       <Sidebar />
     <Outlet/>
    </div>
  )
}

export default Dashboard
