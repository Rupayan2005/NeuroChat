import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import {
  Send,
  Palette,
  Eye,
  Sparkles,
  Check,
  Settings as SettingsIcon,
} from "lucide-react";
import { useState } from "react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going? 😊", isSent: false },
  {
    id: 2,
    content:
      "I'm doing great! Just working on some new features for NeuroChat! 🚀",
    isSent: true,
  },
  {
    id: 3,
    content: "That sounds awesome! Can't wait to try them out! ✨",
    isSent: false,
  },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const [searchTheme, setSearchTheme] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const themeCategories = {
    all: THEMES,
    light: [
      "light",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "garden",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "cmyk",
      "autumn",
      "business",
      "lemonade",
      "winter",
    ],
    dark: [
      "dark",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "forest",
      "aqua",
      "black",
      "luxury",
      "dracula",
      "night",
      "coffee",
      "dim",
      "sunset",
    ],
    colorful: [
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "bumblebee",
      "emerald",
      "forest",
      "aqua",
      "pastel",
      "fantasy",
    ],
  };

  const filteredThemes = themeCategories[selectedCategory].filter((t) =>
    t.toLowerCase().includes(searchTheme.toLowerCase())
  );

  return (
    <div className="h-screen pt-20 bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-2xl">
              <SettingsIcon className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Settings
          </h1>
          <p className="text-xl text-base-content/70">
            Customize your NeuroChat experience
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Theme Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Palette className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Theme Selection</h2>
                  <p className="text-base-content/70">
                    Choose from 35+ beautiful themes
                  </p>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search themes..."
                    className="input input-bordered w-full rounded-2xl"
                    value={searchTheme}
                    onChange={(e) => setSearchTheme(e.target.value)}
                  />
                </div>
                <select
                  className="select select-bordered rounded-2xl min-w-[150px]"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Themes</option>
                  <option value="light">Light Themes</option>
                  <option value="dark">Dark Themes</option>
                  <option value="colorful">Colorful Themes</option>
                </select>
              </div>

              {/* Theme Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {filteredThemes.map((t) => (
                  <button
                    key={t}
                    className={`
                      group relative flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-300 transform hover:scale-105
                      ${
                        theme === t
                          ? "bg-primary/20 ring-2 ring-primary shadow-lg"
                          : "bg-base-200/50 hover:bg-base-200 hover:shadow-md"
                      }
                    `}
                    onClick={() => setTheme(t)}
                  >
                    {/* Theme Preview */}
                    <div
                      className="relative h-12 w-full rounded-xl overflow-hidden shadow-md"
                      data-theme={t}
                    >
                      <div className="absolute inset-0 grid grid-cols-4 gap-[1px] p-1">
                        <div className="rounded-sm bg-primary"></div>
                        <div className="rounded-sm bg-secondary"></div>
                        <div className="rounded-sm bg-accent"></div>
                        <div className="rounded-sm bg-neutral"></div>
                      </div>
                    </div>

                    {/* Theme Name */}
                    <span
                      className={`text-xs font-semibold text-center transition-colors ${
                        theme === t ? "text-primary" : "text-base-content/70"
                      }`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </span>

                    {/* Selected Indicator */}
                    {theme === t && (
                      <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1 shadow-lg animate-bounce">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {filteredThemes.length === 0 && (
                <div className="text-center py-8 text-base-content/50">
                  <Sparkles className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No themes found matching your search</p>
                </div>
              )}
            </div>
          </div>

          {/* Live Preview */}
          <div className="space-y-6">
            <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-secondary/10 rounded-xl">
                  <Eye className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Live Preview</h3>
                  <p className="text-sm text-base-content/70">
                    Current theme:{" "}
                    <span className="font-semibold capitalize text-primary">
                      {theme}
                    </span>
                  </p>
                </div>
              </div>

              {/* Mock Chat Interface */}
              <div className="bg-base-100 rounded-2xl border border-base-300 overflow-hidden shadow-lg">
                {/* Mock Chat Header */}
                <div className="px-4 py-3 bg-base-200 border-b border-base-300">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                        JD
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-base-100"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">John Doe</h4>
                      <p className="text-xs text-success">Online</p>
                    </div>
                  </div>
                </div>

                {/* Mock Messages */}
                <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.isSent ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-2xl p-3 shadow-sm transition-all duration-200 hover:shadow-md
                          ${
                            message.isSent
                              ? "bg-gradient-to-r from-primary to-primary-focus text-white"
                              : "bg-base-200"
                          }
                        `}
                      >
                        <p className="text-sm leading-relaxed">
                          {message.content}
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            message.isSent
                              ? "text-white/70"
                              : "text-base-content/50"
                          }`}
                        >
                          {message.id === 1
                            ? "2:30 PM"
                            : message.id === 2
                            ? "2:32 PM"
                            : "2:35 PM"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mock Input */}
                <div className="p-3 border-t border-base-300 bg-base-50">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered input-sm flex-1 rounded-xl"
                      placeholder="Type a message..."
                      readOnly
                    />
                    <button className="btn btn-primary btn-sm btn-circle">
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Theme Stats */}
            <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                Theme Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-base-content/70">
                    Total Themes
                  </span>
                  <span className="font-bold text-primary">
                    {THEMES.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-base-content/70">
                    Current Theme
                  </span>
                  <span className="badge badge-primary capitalize">
                    {theme}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-base-content/70">
                    Theme Category
                  </span>
                  <span className="text-sm font-medium">
                    {themeCategories.light.includes(theme)
                      ? "Light"
                      : themeCategories.dark.includes(theme)
                      ? "Dark"
                      : "Colorful"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
