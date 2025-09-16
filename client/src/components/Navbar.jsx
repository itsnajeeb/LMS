import { useEffect } from "react";
import { Menu, School, LogOut, User, LayoutDashboard } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DarkMode } from "../DarkMode";

import { userLoggedOut } from "../features/authSlice";
import { authApi, useLogoutUserMutation } from "../features/api/authApi";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

  const logoutHandler = async () => {
    await logoutUser().unwrap();
    dispatch(userLoggedOut());
    dispatch(authApi.util.resetApiState());
    navigate("/login");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Logged out successfully");
    }
  }, [isSuccess]);

  return (
    <header className="sticky top-0 z-20 w-full border-b bg-white/80 backdrop-blur-md dark:bg-gray-900/80 dark:border-gray-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-extrabold text-xl">
          <School className="h-6 w-6 text-primary" />
          <span className="hidden sm:block">E-Learning</span>
        </Link>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/courses" className="hover:text-primary transition">
            Courses
          </Link>
          <Link to="/about" className="hover:text-primary transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-primary transition">
            Contact
          </Link>
        </div>

        {/* User & Controls */}
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profileUrl ||
                      "https://via.placeholder.com/150?text=User"
                    }
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/my-learning" className="flex items-center gap-2">
                    <User className="h-4 w-4" /> My Learning
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" /> Edit Profile
                  </Link>
                </DropdownMenuItem>
                {user.role === "instructor" && (
                  <DropdownMenuItem asChild>
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center gap-2"
                    >
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-500"
                  onClick={logoutHandler}
                >
                  <LogOut className="h-4 w-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex gap-2">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/signup")}>Signup</Button>
            </div>
          )}
          <DarkMode />

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileNavbar
              user={user}
              logoutHandler={logoutHandler}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

// Mobile Navbar
const MobileNavbar = ({ user, logoutHandler }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="rounded-full">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-64">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <School /> E-Learning
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-4 text-lg">
          <Link to="/courses">Courses</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          {user && (
            <>
              <Link to="/my-learning">My Learning</Link>
              <Link to="/profile">Edit Profile</Link>
              {user.role === "instructor" && (
                <Link to="/admin/dashboard">Dashboard</Link>
              )}
              <span
                onClick={logoutHandler}
                className="cursor-pointer text-red-500"
              >
                Log out
              </span>
            </>
          )}
        </nav>
        {!user && (
          <div className="mt-6 flex flex-col gap-2">
            <Button onClick={() => navigate("/login")}>Login</Button>
            <Button variant="outline" onClick={() => navigate("/signup")}>
              Signup
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
