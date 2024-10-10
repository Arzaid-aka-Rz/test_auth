import { icons } from "lucide-react";
import { NavLink } from "react-router-dom";

const SidebarLink = ({ link, iconName }) => {
  const Icon = icons[iconName];

  return (
    <NavLink
    to={link.path}
    >
      <div className="flex items-center gap-2">
        <Icon/>
        <span className="mb-1 text-lg flex">{link.name}</span>
      </div>
    </NavLink>
  );
};

export default SidebarLink;
