import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const navLinks = [
  { path: "/about", label: "About" },
  { path: "/members", label: "Members" },
  { path: "/monthly-ratings", label: "Monthly Ratings" },
  { path: "/annual-summary", label: "Annual Top 10" },
  { path: "/festival-ratings", label: "Film Festivals" },
  { path: "/reviews", label: "Reviews" },
  { path: "/news", label: "News" },
];

const Header = () => {
  const location = useLocation();

  return (
    <header className="w-full border-b border-border">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link to="/" className="block w-fit mx-auto mb-8">
          <img 
            src={logo} 
            alt="SOLARIS" 
            className="h-20 w-auto"
          />
        </Link>
        
        <nav className="nav-text">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm tracking-wide">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`hover:opacity-60 transition-opacity ${
                    location.pathname === link.path 
                      ? "border-b border-foreground" 
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
