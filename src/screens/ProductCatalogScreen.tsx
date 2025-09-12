import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { FormField } from "../components/FormField";
import { BarcodeScanner } from "../components/BarcodeScanner";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { UploadIcon, DownloadIcon, PlusIcon, EditIcon, Trash2Icon, ScanIcon } from "lucide-react";

export const ProductCatalogScreen: React.FC = () => {
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);
  const [formData, setFormData] = useState({
    sku: "",
    productName: "",
    measurementType: "",
    measurementValue: "",
    brand: "",
    category: "",
    gst: "",
    mrp: "",
    productImage: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product data:", formData);
    // Handle form submission
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleScanSuccess = (scannedCode: string) => {
    // Auto-fill SKU field with scanned code
    setFormData({ ...formData, sku: scannedCode });
  };

  return (
    <Layout title="PRODUCT CATALOG DETAILS" onBack={() => navigate("/dashboard")}>
      <div className="space-y-4">
        {/* Action Buttons */}
        <div className="flex gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowScanner(true)}
            className="flex-1 border-[#913472] text-[#913472] hover:bg-[#913472] hover:text-white"
          >
            <ScanIcon className="w-4 h-4 mr-2" />
            Scan SKU
          </Button>
          <Button
            className="flex-1 bg-[#913472] hover:bg-[#7a2d61] text-white"
          >
            <DownloadIcon className="w-4 h-4 mr-2" />
            Download Template
          </Button>
        </div>

        {/* CRUD Buttons */}
        <div className="flex gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-[#cc95de80] border-[#913472] text-[#913472] hover:bg-[#cc95de]"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-[#cc95de80] border-[#913472] text-[#913472] hover:bg-[#cc95de]"
          >
            <EditIcon className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-[#cc95de80] border-[#913472] text-[#913472] hover:bg-[#cc95de]"
          >
            <Trash2Icon className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>

        {/* Form */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-[#913472]">Product Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                label="SKU"
                value={formData.sku}
                onChange={(value) => handleFieldChange("sku", value)}
                placeholder="Enter SKU"
                required
              />

              <FormField
                label="Product Name"
                value={formData.productName}
                onChange={(value) => handleFieldChange("productName", value)}
                placeholder="Enter product name"
                required
              />

              <FormField
                label="Measurement Type"
                type="select"
                value={formData.measurementType}
                onChange={(value) => handleFieldChange("measurementType", value)}
                options={[
                  { value: "kg", label: "Kilogram (kg)" },
                  { value: "g", label: "Gram (g)" },
                  { value: "l", label: "Liter (l)" },
                  { value: "ml", label: "Milliliter (ml)" },
                  { value: "pcs", label: "Pieces" },
                ]}
                required
              />

              <FormField
                label="Measurement Value"
                value={formData.measurementValue}
                onChange={(value) => handleFieldChange("measurementValue", value)}
                placeholder="Enter measurement value"
                required
              />

              <FormField
                label="Brand"
                value={formData.brand}
                onChange={(value) => handleFieldChange("brand", value)}
                placeholder="Enter brand name"
                required
              />

              <FormField
                label="Category"
                type="select"
                value={formData.category}
                onChange={(value) => handleFieldChange("category", value)}
                options={[
                  { value: "food", label: "Food & Beverages" },
                  { value: "electronics", label: "Electronics" },
                  { value: "clothing", label: "Clothing" },
                  { value: "household", label: "Household Items" },
                ]}
                required
              />

              <FormField
                label="GST (%)"
                type="select"
                value={formData.gst}
                onChange={(value) => handleFieldChange("gst", value)}
                options={[
                  { value: "0", label: "0%" },
                  { value: "5", label: "5%" },
                  { value: "12", label: "12%" },
                  { value: "18", label: "18%" },
                  { value: "28", label: "28%" },
                ]}
                required
              />

              <FormField
                label="MRP"
                type="text"
                value={formData.mrp}
                onChange={(value) => handleFieldChange("mrp", value)}
                placeholder="Enter MRP"
                required
              />

              <FormField
                label="SKU & Product Name Upload"
                type="file"
                onChange={(value) => handleFieldChange("productImage", value)}
              />

              <Button
                type="submit"
                className="w-full bg-[#913472] hover:bg-[#7a2d61] text-white py-3 text-lg font-semibold"
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>

        <BarcodeScanner
          isOpen={showScanner}
          onClose={() => setShowScanner(false)}
          onScanSuccess={handleScanSuccess}
          title="Scan Product SKU/Barcode"
        />
      </div>
    </Layout>
  );
};