import { useSelector } from "react-redux"

const Instructor = () => {
    const { user } = useSelector((state) => state.profile)
  return (
    <div>
      <h1>
        Hyy {user?.firstName}👋
      </h1>
      <p>Instructor Dashboard</p>

      <div>
        
      </div>
    </div>
  )
}

export default Instructor
