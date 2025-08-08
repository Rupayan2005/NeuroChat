import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, Shield, Star } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20 bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5">
      <div className="max-w-4xl mx-auto p-4 py-8">
        <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 animate-pulse"></div>
            <div className="relative">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                Your Profile
              </h1>
              <p className="text-base-content/70 text-lg">
                Manage your account information
              </p>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-6">
              <div
                className="relative group"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div
                  className={`relative transition-all duration-300 ${
                    isHovering ? "scale-110" : "scale-100"
                  }`}
                >
                  <img
                    src={selectedImg || authUser.profilePic || "/avatar.png"}
                    alt="Profile"
                    className="size-40 rounded-full object-cover border-4 border-base-300 shadow-2xl"
                  />
                  {/* Online Status Indicator */}
                  <div className="absolute -bottom-2 -right-2 size-8 bg-success rounded-full border-4 border-base-100 flex items-center justify-center">
                    <div className="size-4 bg-success rounded-full animate-pulse"></div>
                  </div>
                </div>

                <label
                  htmlFor="avatar-upload"
                  className={`
                    absolute -bottom-3 -right-3
                    bg-primary hover:bg-primary-focus hover:scale-110
                    p-4 rounded-full cursor-pointer 
                    transition-all duration-300 shadow-xl border-4 border-base-100
                    ${
                      isUpdatingProfile
                        ? "animate-pulse pointer-events-none"
                        : ""
                    }
                  `}
                >
                  <Camera className="w-6 h-6 text-white" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-base-content">
                  {authUser?.fullName}
                </h2>
                <p className="text-base-content/70 text-lg">
                  {isUpdatingProfile ? (
                    <span className="loading loading-dots loading-sm text-primary"></span>
                  ) : (
                    "Click the camera icon to update your photo"
                  )}
                </p>
              </div>
            </div>

            {/* Profile Information Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Info Card */}
              <div className="bg-base-200/50 rounded-2xl p-6 space-y-6 hover:shadow-lg transition-all duration-300 border border-base-300">
                <h3 className="text-xl font-semibold flex items-center gap-2 text-primary">
                  <User className="w-5 h-5" />
                  Personal Information
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm text-base-content/70 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </div>
                    <div className="px-4 py-3 bg-base-100 rounded-xl border border-base-300 font-medium">
                      {authUser?.fullName}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-base-content/70 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </div>
                    <div className="px-4 py-3 bg-base-100 rounded-xl border border-base-300 font-medium">
                      {authUser?.email}
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Info Card */}
              <div className="bg-base-200/50 rounded-2xl p-6 space-y-6 hover:shadow-lg transition-all duration-300 border border-base-300">
                <h3 className="text-xl font-semibold flex items-center gap-2 text-secondary">
                  <Shield className="w-5 h-5" />
                  Account Details
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-base-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-base-content/70" />
                      <span className="text-base-content/70">Member Since</span>
                    </div>
                    <span className="font-medium">
                      {new Date(authUser.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-base-300">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-base-content/70" />
                      <span className="text-base-content/70">
                        Account Status
                      </span>
                    </div>
                    <span className="badge badge-success font-medium">
                      Active
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-base-content/70" />
                      <span className="text-base-content/70">Plan</span>
                    </div>
                    <span className="badge badge-primary font-medium">
                      None
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
