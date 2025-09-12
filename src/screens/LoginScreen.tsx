import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (formData.role && formData.username && formData.password) {
      // Store user data in localStorage for demo purposes
      localStorage.setItem("user", JSON.stringify({
        username: formData.username,
        role: formData.role,
      }));
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-purple-500 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-lg flex items-center justify-center border-2 border-dashed border-white/50">
            <span className="text-white text-2xl font-bold">PLUM BERRY</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-white text-base">Roles</Label>
            <Select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="bg-white/90 border-white text-gray-800"
              placeholder="Select Role"
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="staff">Staff</option>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-white text-base">Username</Label>
            <Input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="bg-white/90 border-white text-gray-800"
              placeholder="Enter username"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white text-base">Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-white/90 border-white text-gray-800 pr-12"
                placeholder="Enter password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 p-2"
              >
                {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="text-white text-sm underline hover:no-underline"
            >
              Forgot Password
            </button>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#913472] hover:bg-[#7a2d61] text-white font-semibold py-3 rounded-lg text-lg"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};