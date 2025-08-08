import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search, MessageCircle } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { authUser, onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.fullName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesOnlineFilter = showOnlineOnly
      ? onlineUsers.includes(user._id)
      : true;
    return matchesSearch && matchesOnlineFilter;
  });

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-80 bg-gradient-to-b from-base-100 to-base-200/50 border-r border-base-300/50 flex flex-col transition-all duration-300 backdrop-blur-sm">
      {/* Header with user info */}
      <div className="border-b border-base-300/50 w-full p-5 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-lg animate-gentle-float">
              {authUser?.fullName?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div className="hidden lg:block flex-1 min-w-0">
            <h3 className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent truncate">
              {authUser?.fullName || "User"}
            </h3>
            <p className="text-sm text-base-content/60">Online • Available</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MessageCircle className="size-5 text-primary animate-gentle-bounce" />
          <span className="font-semibold hidden lg:block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Contacts
          </span>
          <div className="ml-auto badge badge-primary badge-sm animate-gentle-pulse">
            {filteredUsers.length}
          </div>
        </div>

        {/* Search bar */}
        <div className="mt-3 hidden lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-base-content/40" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-sm w-full pl-10 bg-base-200/50 border-base-300/50 focus:border-primary/50 transition-all duration-200"
            />
          </div>
        </div>

        {/* Online filter */}
        <div className="mt-3 hidden lg:flex items-center justify-between">
          <label className="cursor-pointer flex items-center gap-2 group">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary transition-all duration-200"
            />
            <span className="text-sm group-hover:text-primary transition-colors duration-200">
              Show online only
            </span>
          </label>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-base-content/60">
              {onlineUsers.length - 1} online
            </span>
          </div>
        </div>
      </div>

      {/* Users list */}
      <div className="overflow-y-auto w-full py-2 custom-scrollbar">
        {filteredUsers.map((user, index) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 lg:p-4 flex items-center gap-3 group
              hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10
              hover:shadow-md hover:scale-[1.02] transition-all duration-300
              border-l-4 border-transparent hover:border-primary/50
              ${
                selectedUser?._id === user._id
                  ? "bg-gradient-to-r from-primary/20 to-secondary/20 border-l-primary shadow-lg scale-[1.02]"
                  : ""
              }
            `}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="relative mx-auto lg:mx-0">
              <div className="relative">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="size-11 lg:size-12 object-cover rounded-full shadow-md ring-2 ring-base-300/30 group-hover:ring-primary/30 transition-all duration-300"
                />
                {onlineUsers.includes(user._id) && (
                  <div className="absolute -bottom-1 -right-1">
                    <div className="size-4 bg-green-500 rounded-full border-2 border-white shadow-sm animate-gentle-pulse"></div>
                  </div>
                )}
              </div>
              {/* Status indicator for mobile */}
              <div className="lg:hidden absolute -top-1 -right-1">
                <div
                  className={`size-3 rounded-full border border-white ${
                    onlineUsers.includes(user._id)
                      ? "bg-green-500"
                      : "bg-gray-400"
                  } animate-gentle-pulse`}
                ></div>
              </div>
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="font-semibold truncate group-hover:text-primary transition-colors duration-200">
                  {user.fullName}
                </div>
                {selectedUser?._id === user._id && (
                  <MessageCircle className="size-4 text-primary animate-gentle-bounce" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`text-xs px-2 py-1 rounded-full font-medium transition-all duration-200 ${
                    onlineUsers.includes(user._id)
                      ? "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                      : "text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-base-content/60 py-8 animate-fade-in">
            <Users className="size-12 mx-auto mb-3 text-base-content/30" />
            <p className="font-medium">
              {searchTerm ? "No contacts found" : "No online users"}
            </p>
            <p className="text-sm mt-1">
              {searchTerm ? "Try a different search term" : "Check back later"}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
