import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Users,
  Shield,
  Zap,
  Image,
  Moon,
  ArrowRight,
  Heart,
  Globe,
} from "lucide-react";
import Navbar from "../components/Navbar";

const WelcomePage = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Real-time Messaging",
      description:
        "Send and receive messages instantly with real-time synchronization across all devices.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Online Status",
      description:
        "See who's online and available for chat with live presence indicators.",
    },
    {
      icon: <Image className="w-8 h-8" />,
      title: "Image Sharing",
      description:
        "Share photos and images seamlessly with built-in image upload and preview.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description:
        "Your conversations are protected with end-to-end encryption and secure authentication.",
    },
    {
      icon: <Moon className="w-8 h-8" />,
      title: "Theme Customization",
      description:
        "Choose from 35+ beautiful themes to personalize your chat experience.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description:
        "Optimized performance ensures smooth and responsive messaging experience.",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div
            className={`text-center space-y-6 transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Logo Animation */}
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

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in">
              Welcome to NeuroChat
            </h1>

            <p className="text-xl md:text-2xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
              Connect, chat, and share with friends in a beautiful, modern
              messaging experience.
              <span className="block mt-2 text-primary font-semibold">
                Built for the future of communication.
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Link
                to="/signup"
                className="btn btn-primary btn-lg group shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/login"
                className="btn btn-outline btn-lg hover:scale-105 transition-transform duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-base-200/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Everything you need for seamless communication, wrapped in a
              beautiful interface.
            </p>
          </div>

          {/* Interactive Feature Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Feature Display */}
            <div className="order-2 lg:order-1">
              <div className="bg-base-100 rounded-2xl p-8 shadow-2xl border border-base-300 transform hover:scale-105 transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    {features[currentFeature].icon}
                  </div>
                  <h3 className="text-2xl font-bold">
                    {features[currentFeature].title}
                  </h3>
                </div>
                <p className="text-base-content/70 text-lg leading-relaxed">
                  {features[currentFeature].description}
                </p>

                {/* Progress Indicator */}
                <div className="flex gap-2 mt-6">
                  {features.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        index === currentFeature
                          ? "bg-primary w-8"
                          : "bg-base-300 w-4"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    index === currentFeature
                      ? "bg-primary/10 border-primary shadow-lg"
                      : "bg-base-100 border-base-300 hover:border-primary/50"
                  }`}
                  onClick={() => setCurrentFeature(index)}
                >
                  <div
                    className={`p-2 rounded-lg w-fit mb-3 ${
                      index === currentFeature
                        ? "bg-primary text-white"
                        : "bg-base-200 text-base-content"
                    }`}
                  >
                    {feature.icon}
                  </div>
                  <h4 className="font-semibold text-sm">{feature.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Preview Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Beautiful Interface</h2>
            <p className="text-xl text-base-content/70">
              Experience modern design with smooth animations and intuitive
              navigation.
            </p>
          </div>

          {/* Mock Chat Interface */}
          <div className="bg-base-100 rounded-2xl shadow-2xl overflow-hidden border border-base-300">
            {/* Chat Header */}
            <div className="bg-base-200 p-4 border-b border-base-300">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                    JD
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-base-100"></div>
                </div>
                <div>
                  <h3 className="font-semibold">John Doe</h3>
                  <p className="text-sm text-success">Online</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-6 space-y-4 h-80 overflow-hidden">
              {/* Incoming message */}
              <div className="flex justify-start">
                <div className="bg-base-200 rounded-2xl rounded-bl-md p-4 max-w-xs transform hover:scale-105 transition-transform duration-200">
                  <p>Hey! How's your day going? 😊</p>
                  <span className="text-xs text-base-content/50 mt-1 block">
                    2:30 PM
                  </span>
                </div>
              </div>

              {/* Outgoing message */}
              <div className="flex justify-end">
                <div className="bg-primary text-primary-content rounded-2xl rounded-br-md p-4 max-w-xs transform hover:scale-105 transition-transform duration-200">
                  <p>
                    Great! Just working on some exciting new features for
                    NeuroChat! 🚀
                  </p>
                  <span className="text-xs text-primary-content/70 mt-1 block">
                    2:32 PM
                  </span>
                </div>
              </div>

              {/* Typing indicator */}
              <div className="flex justify-start">
                <div className="bg-base-200 rounded-2xl rounded-bl-md p-4 flex items-center gap-1">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-base-content/30 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-base-content/30 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-base-content/30 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-xs text-base-content/50 ml-2">
                    John is typing...
                  </span>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-base-300 bg-base-50">
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input input-bordered flex-1"
                  placeholder="Type your message..."
                  readOnly
                />
                <button className="btn btn-primary">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Start Chatting?
            </h2>
            <p className="text-xl text-base-content/70">
              Join thousands of users already enjoying seamless communication
              with NeuroChat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/signup"
                className="btn btn-primary btn-lg group shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                Create Free Account
              </Link>
              <div className="flex items-center gap-2 text-base-content/70">
                <Globe className="w-4 h-4" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-base-200">
        <div className="container mx-auto px-4 text-center text-base-content/60">
          <div className="flex justify-center items-center gap-2 mb-4">
            <MessageSquare className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-base-content">
              NeuroChat
            </span>
          </div>
          <p>
            &copy; 2025 NeuroChat. Built with ❤️ for seamless communication.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
