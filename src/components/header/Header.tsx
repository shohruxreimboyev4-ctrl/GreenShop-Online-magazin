import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";
import Logo from "../../assets/images/Logo.png";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../hooks/useRedux/useRedux";
import { setAuthorizationModalVisibility } from "../../redux/modal-store";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useReduxDispatch();
  const { user, isAuth } = useReduxSelector((state) => state.userSlice);

  const navLinkClass = (path: string) =>
    `relative text-[16px] font-medium transition-colors
     ${
       pathname === path
         ? "text-[#46A358] after:absolute after:-bottom-[18px] after:left-0 after:w-full after:h-[2px] after:bg-[#46A358]"
         : "text-[#3d3d3d] hover:text-[#46A358]"
     }`;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#46A35833]">
      <div className="w-[90%] max-w-[1550px] mx-auto h-[70px] flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="GreenShop" className="h-8 object-contain" />
        </Link>

        {/* NAV */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={navLinkClass("/")}>
            Home
          </Link>
          <Link to="/shop" className={navLinkClass("/shop")}>
            Shop
          </Link>
          <Link to="/blog" className={navLinkClass("/blog")}>
            Blogs
          </Link>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-6">
          <Search className="w-5 h-5 text-[#3d3d3d] cursor-pointer hover:text-[#46A358]" />

          <div className="relative cursor-pointer">
            <ShoppingCart className="w-5 h-5 text-[#3d3d3d] hover:text-[#46A358]" />
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#46A358] text-white text-[10px] rounded-full flex items-center justify-center">
              6
            </span>
          </div>

          <button
            onClick={() => {
              if (isAuth) return navigate("/profile");
              dispatch(setAuthorizationModalVisibility());
            }}
            className="bg-[#46A358] hover:bg-[#3d8f4d] transition-all text-white text-[15px] font-medium px-6 py-[6px] rounded-md flex items-center gap-2"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            {user ? user.name : "Login"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
