import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { FormField } from "../components/FormField";
import { BarcodeScanner } from "../components/BarcodeScanner";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { UploadIcon, DownloadIcon, PlusIcon, EditIcon, Trash2Icon, ScanIcon } from "lucide-react";

export const ClosingStockScreen: React.FC = () => {
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);
  const [formData, setFormData] = useState({
    closingStockId: "",
    sku: "",
    productName: "",
    block: "",
    quantity: "",
    manufactureDate: "",
    expiryDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Closing stock data:", formData);
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleScanSuccess = (scannedCode: string) => {
    // Auto-fill SKU field with scanned code
    setFormData({ ...formData, sku: scannedCode });
  };

  return (
    <Layout title="CLOSING STOCK DETAILS" onBack={() => navigate("/dashboard")}>
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
            <CardTitle className="text-[#913472]">Closing Stock Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                label="Closing Stock ID"
                value={formData.closingStockId}
                onChange={(value) => handleFieldChange("closingStockId", value)}
                placeholder="Enter closing stock ID"
                required
              />

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
                label="Block"
                type="select"
                value={formData.block}
                onChange={(value) => handleFieldChange("block", value)}
                options={[
                  { value: "block-a", label: "Block A" },
                  { value: "block-b", label: "Block B" },
                  { value: "block-c", label: "Block C" },
                ]}
                required
              />

              <FormField
                label="Quantity"
                value={formData.quantity}
                onChange={(value) => handleFieldChange("quantity", value)}
                placeholder="Enter quantity"
                required
              />

              <FormField
                label="Manufacture Date"
                type="date"
                value={formData.manufactureDate}
                onChange={(value) => handleFieldChange("manufactureDate", value)}
                required
              />

              <FormField
                label="Expiry Date"
                type="date"
                value={formData.expiryDate}
                onChange={(value) => handleFieldChange("expiryDate", value)}
                required
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