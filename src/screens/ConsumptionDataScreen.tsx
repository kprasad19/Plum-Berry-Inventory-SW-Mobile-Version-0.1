import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { FormField } from "../components/FormField";
import { BarcodeScanner } from "../components/BarcodeScanner";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { UploadIcon, DownloadIcon, PlusIcon, EditIcon, Trash2Icon, ScanIcon } from "lucide-react";

export const ConsumptionDataScreen: React.FC = () => {
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);
  const [formData, setFormData] = useState({
    vendorName: "",
    date: "",
    block: "",
    billUpload: "",
    sku: "",
    productName: "",
    brand: "",
    category: "",
    quantity: "",
    landingPrice: "",
    gst: "",
    unitPrice: "",
    mfgExpUpload: "",
    manufactureDate: "",
    expiryDate: "",
    from: "",
    to: "",
    mrp: "",
    enteredBy: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Consumption data:", formData);
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleScanSuccess = (scannedCode: string) => {
    // Auto-fill SKU field with scanned code
    setFormData({ ...formData, sku: scannedCode });
  };

  return (
    <Layout title="CONSUMPTION DATA DETAILS" onBack={() => navigate("/dashboard")}>
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
            <CardTitle className="text-[#913472]">Consumption Data Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Vendor Name"
                  value={formData.vendorName}
                  onChange={(value) => handleFieldChange("vendorName", value)}
                  placeholder="Enter vendor name"
                  required
                />

                <FormField
                  label="Date"
                  type="date"
                  value={formData.date}
                  onChange={(value) => handleFieldChange("date", value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                  label="Bill Upload"
                  type="file"
                  onChange={(value) => handleFieldChange("billUpload", value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Brand"
                  type="select"
                  value={formData.brand}
                  onChange={(value) => handleFieldChange("brand", value)}
                  options={[
                    { value: "brand1", label: "Brand 1" },
                    { value: "brand2", label: "Brand 2" },
                    { value: "brand3", label: "Brand 3" },
                  ]}
                  required
                />

                <FormField
                  label="Category"
                  value={formData.category}
                  onChange={(value) => handleFieldChange("category", value)}
                  placeholder="Enter category"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Quantity"
                  value={formData.quantity}
                  onChange={(value) => handleFieldChange("quantity", value)}
                  placeholder="Enter quantity"
                  required
                />

                <FormField
                  label="Landing Price (With/Without GST)"
                  type="select"
                  value={formData.landingPrice}
                  onChange={(value) => handleFieldChange("landingPrice", value)}
                  options={[
                    { value: "with-gst", label: "With GST" },
                    { value: "without-gst", label: "Without GST" },
                  ]}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                  label="Unit Price"
                  value={formData.unitPrice}
                  onChange={(value) => handleFieldChange("unitPrice", value)}
                  placeholder="Enter unit price"
                  required
                />
              </div>

              <FormField
                label="MFG/EXP Upload"
                type="file"
                onChange={(value) => handleFieldChange("mfgExpUpload", value)}
              />

              <div className="grid grid-cols-2 gap-4">
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="From"
                  type="select"
                  value={formData.from}
                  onChange={(value) => handleFieldChange("from", value)}
                  options={[
                    { value: "warehouse", label: "Warehouse" },
                    { value: "store", label: "Store" },
                    { value: "supplier", label: "Supplier" },
                  ]}
                  required
                />

                <FormField
                  label="To"
                  type="select"
                  value={formData.to}
                  onChange={(value) => handleFieldChange("to", value)}
                  options={[
                    { value: "kitchen", label: "Kitchen" },
                    { value: "store", label: "Store" },
                    { value: "customer", label: "Customer" },
                  ]}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="MRP"
                  value={formData.mrp}
                  onChange={(value) => handleFieldChange("mrp", value)}
                  placeholder="Enter MRP"
                  required
                />

                <FormField
                  label="Entered by"
                  type="select"
                  value={formData.enteredBy}
                  onChange={(value) => handleFieldChange("enteredBy", value)}
                  options={[
                    { value: "admin", label: "Admin" },
                    { value: "manager", label: "Manager" },
                    { value: "staff", label: "Staff" },
                  ]}
                  required
                />
              </div>

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