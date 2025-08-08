import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-gradient-to-r from-base-100/90 via-base-200/80 to-base-100/90 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg shadow-lg animate-fade-in-up">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo and App Name */}
          <div className="flex items-center gap-8">
            <Link
              to="/home"
              className="flex items-center gap-2.5 group hover:opacity-90 transition-all"
            >
              <div className="size-10 rounded-xl bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center shadow-md">
                <MessageSquare className="w-6 h-6 text-white animate-spin-slow group-hover:scale-110 transition-transform" />
              </div>
              <h1 className="text-xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent tracking-tight animate-gradient-shift">
                NeuroChat
              </h1>
            </Link>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className="btn btn-sm gap-2 bg-gradient-to-r from-primary/80 to-secondary/80 text-white border-none shadow-md hover:scale-105 hover:from-primary/90 hover:to-secondary/90 transition-all"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to={"/profile"}
                  className="btn btn-sm gap-2 bg-gradient-to-r from-primary/80 to-secondary/80 text-white border-none shadow-md hover:scale-105 hover:from-primary/90 hover:to-secondary/90 transition-all"
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="flex gap-2 items-center px-3 py-2 rounded-lg bg-gradient-to-r from-accent/80 to-primary/80 text-white shadow-md hover:scale-105 hover:from-accent/90 hover:to-primary/90 transition-all"
                  onClick={logout}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}

            
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
