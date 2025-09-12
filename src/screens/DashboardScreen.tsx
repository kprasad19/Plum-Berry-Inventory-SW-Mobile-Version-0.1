import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  PackageIcon,
  UsersIcon,
  ShoppingCartIcon,
  TrendingDownIcon,
  ArchiveIcon,
  LogOutIcon,
} from "lucide-react";

export const DashboardScreen: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Product Catalog",
      icon: PackageIcon,
      route: "/product-catalog",
      color: "bg-blue-500",
    },
    {
      title: "Vendor Catalog",
      icon: UsersIcon,
      route: "/vendor-catalog",
      color: "bg-green-500",
    },
    {
      title: "Purchase Data",
      icon: ShoppingCartIcon,
      route: "/purchase-data",
      color: "bg-orange-500",
    },
    {
      title: "Consumption Data",
      icon: TrendingDownIcon,
      route: "/consumption-data",
      color: "bg-red-500",
    },
    {
      title: "Closing Stock",
      icon: ArchiveIcon,
      route: "/closing-stock",
      color: "bg-purple-500",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Layout title="INVENTORY MANAGEMENT" showBackButton={false}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {menuItems.map((item) => (
            <Card
              key={item.route}
              className="cursor-pointer hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm"
              onClick={() => navigate(item.route)}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${item.color}`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#913472]">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full mt-8 border-[#913472] text-[#913472] hover:bg-[#913472] hover:text-white"
        >
          <LogOutIcon className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </Layout>
  );
};