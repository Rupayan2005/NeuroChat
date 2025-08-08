import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-3 border-b border-base-300 bg-gradient-to-r from-base-100/80 via-base-200/60 to-base-100/80 shadow-sm animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Animated Avatar */}
          <div className="relative">
            <div className="size-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg animate-gentle-float border-2 border-white">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                className="size-12 object-cover rounded-full border-2 border-primary/30"
              />
              {onlineUsers.includes(selectedUser._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-gentle-pulse"></span>
              )}
            </div>
          </div>

          {/* User info */}
          <div className="min-w-0">
            <h3 className="font-bold text-lg truncate bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient-shift">
              {selectedUser.fullName}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium transition-all duration-200 ${
                  onlineUsers.includes(selectedUser._id)
                    ? "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                    : "text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="btn btn-ghost btn-sm rounded-full hover:bg-primary/10 transition-all"
          title="Close chat"
        >
          <X className="w-5 h-5 text-base-content/70" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
