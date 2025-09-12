import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LoginScreen } from "./screens/LoginScreen";
import { DashboardScreen } from "./screens/DashboardScreen";
import { ProductCatalogScreen } from "./screens/ProductCatalogScreen";
import { VendorCatalogScreen } from "./screens/VendorCatalogScreen";
import { PurchaseDataScreen } from "./screens/PurchaseDataScreen";
import { ConsumptionDataScreen } from "./screens/ConsumptionDataScreen";
import { ClosingStockScreen } from "./screens/ClosingStockScreen";

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = localStorage.getItem("user");
  return user ? <>{children}</> : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product-catalog"
            element={
              <ProtectedRoute>
                <ProductCatalogScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendor-catalog"
            element={
              <ProtectedRoute>
                <VendorCatalogScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchase-data"
            element={
              <ProtectedRoute>
                <PurchaseDataScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/consumption-data"
            element={
              <ProtectedRoute>
                <ConsumptionDataScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/closing-stock"
            element={
              <ProtectedRoute>
                <ClosingStockScreen />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;