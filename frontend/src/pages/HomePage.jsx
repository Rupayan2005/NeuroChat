import { useChatStore } from "../store/useChatStore";
import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [selectedUser]);

  return (
    <div className="h-screen bg-gradient-to-br from-primary/5 via-base-200 to-secondary/5">
      <div className="flex items-center justify-center pt-20 px-4">
        <div
          className={`bg-base-100 rounded-2xl shadow-2xl w-full max-w-6xl h-[calc(100vh-8rem)] border border-base-300 transition-all duration-500 ${
            isAnimating ? "scale-105" : "scale-100"
          }`}
        >
          <div className="flex h-full rounded-2xl overflow-hidden">
            <div className="transition-all duration-300 ease-in-out">
              <Sidebar />
            </div>

            <div
              className={`flex-1 transition-all duration-500 ease-in-out ${
                selectedUser
                  ? "translate-x-0 opacity-100"
                  : "translate-x-2 opacity-95"
              }`}
            >
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
