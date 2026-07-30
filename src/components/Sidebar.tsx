import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Transactions", path: "/transactions" },
    { name: "Categories", path: "/categories" },
    { name: "Budgets", path: "/budgets" },
    { name: "Savings Goals", path: "/savings" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <aside className="sidebar">
      <h2 className="logo">Ledger</h2>

      <nav>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}