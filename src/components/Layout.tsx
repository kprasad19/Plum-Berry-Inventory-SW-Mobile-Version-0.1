import React from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "./ui/button";

interface LayoutProps {
  title: string;
  onBack?: () => void;
  children: React.ReactNode;
  showBackButton?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  title,
  onBack,
  children,
  showBackButton = true,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#cc95de40] to-[#cc95de60]">
      <div className="max-w-md mx-auto bg-gradient-to-br from-[#cc95de40] to-[#cc95de60] min-h-screen">
        {/* Header */}
        <header className="bg-[#913472] px-4 py-6 relative">
          {showBackButton && onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 p-2"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </Button>
          )}
          <h1 className="text-white text-lg font-black text-center px-8">
            {title}
          </h1>
        </header>

        {/* Content */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};