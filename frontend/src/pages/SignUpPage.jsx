import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
  Check,
  X,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  // Password strength validation
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, feedback: [] };

    const feedback = [];
    let score = 0;

    // Length check
    if (password.length >= 8) {
      score += 20;
    } else {
      feedback.push("At least 8 characters");
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
      score += 20;
    } else {
      feedback.push("One uppercase letter");
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
      score += 20;
    } else {
      feedback.push("One lowercase letter");
    }

    // Number check
    if (/\d/.test(password)) {
      score += 20;
    } else {
      feedback.push("One number");
    }

    // Special character check
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 20;
    } else {
      feedback.push("One special character");
    }

    return { score, feedback };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const getStrengthColor = (score) => {
    if (score < 40) return "text-error";
    if (score < 60) return "text-warning";
    if (score < 80) return "text-info";
    return "text-success";
  };

  const getStrengthText = (score) => {
    if (score < 40) return "Weak";
    if (score < 60) return "Fair";
    if (score < 80) return "Good";
    return "Strong";
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (passwordStrength.score < 80)
      return toast.error("Please use a stronger password");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl animate-pulse"></div>
                <div className="relative w-15 h-15 rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center animate-bounce shadow-2xl">
                  <MessageSquare className="w-8 h-8 text-white animate-pulse" />
                </div>
              </div>
              <h1 className="text-3xl font-bold mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Create Account
              </h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label mb-3">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10 transition-all duration-300 focus:scale-105 ${
                    formData.fullName ? "input-success" : ""
                  }`}
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label mb-3">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10 transition-all duration-300 focus:scale-105 ${
                    formData.email && /\S+@\S+\.\S+/.test(formData.email)
                      ? "input-success"
                      : ""
                  }`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label mb-3">
                <span className="label-text font-medium">Password</span>
                {formData.password && (
                  <span
                    className={`label-text-alt font-semibold ${getStrengthColor(
                      passwordStrength.score
                    )}`}
                  >
                    <ShieldCheck className="size-3 inline mr-1" />
                    {getStrengthText(passwordStrength.score)}
                  </span>
                )}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 pr-10 transition-all duration-300 focus:scale-105 ${
                    passwordStrength.score >= 80
                      ? "input-success"
                      : passwordStrength.score >= 60
                      ? "input-warning"
                      : passwordStrength.score >= 40
                      ? "input-info"
                      : "input-error"
                  }`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:scale-110 transition-transform"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2 space-y-2">
                  {/* Progress Bar */}
                  <div className="w-full bg-base-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        passwordStrength.score >= 80
                          ? "bg-success"
                          : passwordStrength.score >= 60
                          ? "bg-warning"
                          : passwordStrength.score >= 40
                          ? "bg-info"
                          : "bg-error"
                      }`}
                      style={{ width: `${passwordStrength.score}%` }}
                    ></div>
                  </div>

                  {/* Requirements */}
                  <div className="grid grid-cols-1 gap-1 text-xs">
                    {passwordStrength.feedback.length > 0 && (
                      <div className="text-base-content/60">
                        <span className="font-medium">Required:</span>
                        {passwordStrength.feedback.map((req, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1 ml-2"
                          >
                            <X className="size-3 text-error" />
                            <span>{req}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {passwordStrength.score >= 80 && (
                      <div className="flex items-center gap-1 text-success">
                        <Check className="size-3" />
                        <span className="font-medium">Strong password! 🎉</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              disabled={isSigningUp || passwordStrength.score < 80}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <MessageSquare className="size-5 group-hover:scale-110 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="text-center space-y-3">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link
                to="/login"
                className="link link-primary hover:link-secondary font-semibold"
              >
                Sign in
              </Link>
            </p>
            <Link
              to="/"
              className="text-sm text-base-content/50 hover:text-primary transition-colors block"
            >
              ← Back to Welcome Page
            </Link>
          </div>
        </div>
      </div>

      {/* right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};
export default SignUpPage;
