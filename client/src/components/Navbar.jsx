import { Menu, School, User, Book, Edit, LogOut, LayoutDashboard } from "lucide-react";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User log out.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-50 shadow-lg backdrop-blur-md flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <School size={32} className="text-blue-500" />
        <Link to="/" className="text-2xl font-bold tracking-wide text-gray-900 dark:text-white">
           Wellcome My E-Learning Website
        </Link>
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer hover:scale-105 transition-transform">
                <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} alt="Profile" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 bg-white dark:bg-gray-900 shadow-md rounded-lg">
              <DropdownMenuLabel className="flex items-center gap-2 p-3 text-lg font-semibold text-gray-700 dark:text-gray-200">
                <User size={20} /> My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Book size={20} className="mr-3 text-blue-500" />
                  <Link to="my-learning" className="text-gray-800 dark:text-gray-200">My Learning</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit size={20} className="mr-3 text-yellow-500" />
                  <Link to="profile" className="text-gray-800 dark:text-gray-200">Edit Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logoutHandler} className="text-red-500">
                  <LogOut size={20} className="mr-3" /> Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
              {user?.role === "instructor" && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LayoutDashboard size={20} className="mr-3 text-green-500" />
                    <Link to="/admin/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate("/login")} className="px-5 py-2">Login</Button>
            <Button onClick={() => navigate("/login")} className="bg-blue-500 px-5 py-2">Signup</Button>
          </div>
        )}
        <DarkMode />
      </div>
      {/* Mobile Menu */}
      <div className="md:hidden">
        <MobileNavbar user={user} />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = ({ user }) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-5 p-5 bg-white dark:bg-gray-900">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>
            <Link to="/" className="text-2xl font-bold">E-Learning</Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4 text-lg">
          <Link to="/my-learning" className="flex items-center gap-3 hover:text-blue-500 transition-colors">
            <Book size={20} /> My Learning
          </Link>
          <Link to="/profile" className="flex items-center gap-3 hover:text-yellow-500 transition-colors">
            <Edit size={20} /> Edit Profile
          </Link>
          <p className="flex items-center gap-3 cursor-pointer text-red-500 hover:text-red-700 transition-colors" onClick={() => navigate("/login")}>
            <LogOut size={20} /> Log out
          </p>
        </nav>
        {user?.role === "instructor" && (
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" onClick={() => navigate("/admin/dashboard")} className="flex items-center gap-3">
                <LayoutDashboard size={20} /> Dashboard
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
