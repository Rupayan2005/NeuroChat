import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
//import { useThemeStore } from "../store/useThemeStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  //const { theme } = useThemeStore();
  const messageEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  // Smooth scroll to bottom when messages change
  useEffect(() => {
    if (messageEndRef.current && messages.length > 0) {
      // Use a small delay to ensure DOM is updated
      setTimeout(() => {
        messageEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }, 100);
    }
  }, [messages]);

  // Additional scroll effect for new messages
  useEffect(() => {
    if (messagesContainerRef.current && messages.length > 0) {
      const container = messagesContainerRef.current;
      const shouldScroll =
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 100;

      if (shouldScroll) {
        setTimeout(() => {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
          });
        }, 100);
      }
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col h-full">
        <ChatHeader />
        <div className="flex-1">
          <MessageSkeleton />
        </div>
        <div className="flex-shrink-0">
          <MessageInput />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <ChatHeader />

      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full min-h-[400px]">
            <div className="text-center text-base-content/50">
              <p className="text-lg">No messages yet</p>
              <p className="text-sm">Start a conversation!</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => {
              const isMe = message.senderId === authUser._id;
              return (
                <div
                  key={message._id}
                  className={`chat ${
                    isMe ? "chat-end" : "chat-start"
                  } animate-fade-in`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="chat-image avatar">
                    <div className="size-10 rounded-full border-2 border-base-300 shadow-lg">
                      <img
                        src={
                          isMe
                            ? authUser.profilePic || "/avatar.png"
                            : selectedUser.profilePic || "/avatar.png"
                        }
                        alt="profile pic"
                        className="rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="chat-header mb-1">
                    <time className="text-xs opacity-50 ml-1">
                      {formatMessageTime(message.createdAt)}
                    </time>
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 shadow-lg flex flex-col transition-all duration-300 hover:shadow-xl ${
                      isMe
                        ? "bg-gradient-to-r from-primary to-primary-focus text-white"
                        : "bg-base-200 hover:bg-base-300 text-base-content"
                    }`}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="sm:max-w-[200px] rounded-xl mb-2 shadow-md hover:shadow-lg transition-shadow duration-300"
                        onLoad={() => {
                          // Auto-scroll when image loads
                          setTimeout(() => {
                            if (messagesContainerRef.current) {
                              messagesContainerRef.current.scrollTo({
                                top: messagesContainerRef.current.scrollHeight,
                                behavior: "smooth",
                              });
                            }
                          }, 100);
                        }}
                      />
                    )}
                    {message.text && (
                      <p
                        className={`leading-relaxed ${
                          isMe ? "text-white" : "text-base-content"
                        }`}
                      >
                        {message.text}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
            {/* Invisible element for scrolling to bottom */}
            <div ref={messageEndRef} className="h-1" />
          </>
        )}
      </div>

      <div className="flex-shrink-0">
        <MessageInput />
      </div>
    </div>
  );
};
export default ChatContainer;
