import { MessageSquare, Users, Sparkles } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-br from-base-100 via-base-100/50 to-primary/5">
      <div className="max-w-md text-center space-y-6">
        {/* Animated Icon Display */}
        <div className="flex justify-center gap-4 mb-8">
          <div className="relative">
            {/* Background glow */}
            <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-xl animate-pulse"></div>

            {/* Main icon container */}
            <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center animate-bounce shadow-2xl">
              <MessageSquare className="w-12 h-12 text-white animate-pulse" />
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary rounded-full animate-ping"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-accent rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Welcome Text with Gradient */}
        <div className="space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in">
            Welcome to NeuroChat! ✨
          </h2>
          <p className="text-base-content/70 text-lg leading-relaxed">
            Select a conversation from the sidebar to start chatting and
            connecting with your friends.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 gap-4 mt-8">
          <div className="flex items-center gap-3 p-4 bg-base-200/50 rounded-xl border border-base-300 hover:bg-base-200 transition-all duration-300 group">
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-sm">Real-time Messaging</h3>
              <p className="text-xs text-base-content/60">
                Chat instantly with online friends
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-base-200/50 rounded-xl border border-base-300 hover:bg-base-200 transition-all duration-300 group">
            <div className="p-2 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors">
              <Sparkles className="w-5 h-5 text-secondary" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-sm">Rich Media Sharing</h3>
              <p className="text-xs text-base-content/60">
                Share images and files seamlessly
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
