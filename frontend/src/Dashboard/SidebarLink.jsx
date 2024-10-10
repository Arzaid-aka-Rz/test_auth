import { icons } from "lucide-react";
import { NavLink } from "react-router-dom";

const SidebarLink = ({ link, iconName }) => {
  const Icon = icons[iconName];

  return (
    <NavLink
    to={link.path}
    >
      <div className="flex items-center gap-x-2">
        <Icon />
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
};

export default SidebarLink;
