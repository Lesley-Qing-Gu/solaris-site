import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <Link to="/about" className="block">
        <img 
          src={logo} 
          alt="SOLARIS" 
          className="h-20 md:h-24 w-auto mb-12"
        />
      </Link>
      
      <nav className="nav-text">
        <ul className="flex flex-col items-center gap-3 text-sm tracking-wide">
          <li><Link to="/about" className="hover:opacity-60 transition-opacity">About</Link></li>
          <li><Link to="/members" className="hover:opacity-60 transition-opacity">Members</Link></li>
          <li><Link to="/monthly-ratings" className="hover:opacity-60 transition-opacity">Monthly Ratings</Link></li>
          <li><Link to="/annual-summary" className="hover:opacity-60 transition-opacity">Annual Summary</Link></li>
          <li><Link to="/festival-ratings" className="hover:opacity-60 transition-opacity">Festival Ratings</Link></li>
          <li><Link to="/reviews" className="hover:opacity-60 transition-opacity">Reviews</Link></li>
          <li><Link to="/news" className="hover:opacity-60 transition-opacity">News</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
