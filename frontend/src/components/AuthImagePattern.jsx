const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-200 p-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full animate-gentle-float"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-32 right-16 w-12 h-12 bg-secondary rounded-full animate-gentle-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-16 h-16 bg-accent rounded-full animate-gentle-float"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute bottom-32 right-32 w-8 h-8 bg-primary rounded-full animate-gentle-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-md text-center relative z-10">
        {/* Animated grid pattern */}
        <div className="grid grid-cols-3 gap-4 mb-8 relative">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`
                aspect-square rounded-2xl relative overflow-hidden
                transform transition-all duration-500 hover:scale-110 hover:rotate-3
                ${
                  i % 2 === 0
                    ? "bg-gradient-to-br from-primary/20 to-secondary/20 animate-gentle-pulse"
                    : "bg-gradient-to-br from-secondary/20 to-accent/20 animate-gentle-bounce"
                }
                shadow-lg hover:shadow-xl
              `}
              style={{
                animationDelay: `${i * 200}ms`,
                animationDuration: i % 2 === 0 ? "3s" : "2s",
              }}
            >
              {/* Inner animated element */}
              <div
                className={`
                absolute inset-2 rounded-xl opacity-60
                ${
                  i % 3 === 0
                    ? "bg-gradient-to-tr from-primary/30 to-transparent animate-spin-slow"
                    : i % 3 === 1
                    ? "bg-gradient-to-bl from-secondary/30 to-transparent animate-reverse-spin-slow"
                    : "bg-gradient-to-br from-accent/30 to-transparent animate-gentle-float"
                }
              `}
                style={{ animationDelay: `${i * 100}ms` }}
              ></div>

              {/* Sparkle effect */}
              {i % 4 === 0 && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full animate-twinkle"></div>
              )}
            </div>
          ))}

          {/* Connecting lines animation */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full opacity-20">
              <defs>
                <linearGradient
                  id="lineGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                  <stop
                    offset="50%"
                    stopColor="currentColor"
                    stopOpacity="0.5"
                  />
                  <stop
                    offset="100%"
                    stopColor="currentColor"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>
              <line
                x1="20%"
                y1="20%"
                x2="80%"
                y2="80%"
                stroke="url(#lineGradient)"
                strokeWidth="1"
                className="animate-draw-line"
              />
              <line
                x1="80%"
                y1="20%"
                x2="20%"
                y2="80%"
                stroke="url(#lineGradient)"
                strokeWidth="1"
                className="animate-draw-line"
                style={{ animationDelay: "1s" }}
              />
            </svg>
          </div>
        </div>

        {/* Enhanced text with animations */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-shift">
            {title}
          </h2>
          <p
            className="text-base-content/70 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "500ms" }}
          >
            {subtitle}
          </p>

          {/* Animated decorative elements */}
          <div className="flex justify-center space-x-2 mt-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full animate-gentle-bounce"
                style={{ animationDelay: `${i * 200}ms` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float-particles"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
