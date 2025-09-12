import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { FormField } from "../components/FormField";
import { BarcodeScanner } from "../components/BarcodeScanner";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { UploadIcon, DownloadIcon, PlusIcon, EditIcon, Trash2Icon, ScanIcon } from "lucide-react";

export const VendorCatalogScreen: React.FC = () => {
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);
  const [formData, setFormData] = useState({
    vendorId: "",
    vendorName: "",
    gstNumber: "",
    address: "",
    contactPerson: "",
    mobileNumber: "",
    emailId: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Vendor data:", formData);
    // Handle form submission
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleScanSuccess = (scannedCode: string) => {
    // Auto-fill Vendor ID field with scanned code
    setFormData({ ...formData, vendorId: scannedCode });
  };

  return (
    <Layout title="VENDOR CATALOG DETAILS" onBack={() => navigate("/dashboard")}>
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
            Scan Vendor ID
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
            <CardTitle className="text-[#913472]">Vendor Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                label="Vendor ID"
                value={formData.vendorId}
                onChange={(value) => handleFieldChange("vendorId", value)}
                placeholder="Enter vendor ID"
                required
              />

              <FormField
                label="Vendor Name"
                value={formData.vendorName}
                onChange={(value) => handleFieldChange("vendorName", value)}
                placeholder="Enter vendor name"
                required
              />

              <FormField
                label="GST Number"
                value={formData.gstNumber}
                onChange={(value) => handleFieldChange("gstNumber", value)}
                placeholder="Enter GST number"
                required
              />

              <FormField
                label="Address"
                type="textarea"
                value={formData.address}
                onChange={(value) => handleFieldChange("address", value)}
                placeholder="Enter complete address"
                required
              />

              <FormField
                label="Contact Person Name"
                value={formData.contactPerson}
                onChange={(value) => handleFieldChange("contactPerson", value)}
                placeholder="Enter contact person name"
                required
              />

              <FormField
                label="Mobile Number"
                type="text"
                value={formData.mobileNumber}
                onChange={(value) => handleFieldChange("mobileNumber", value)}
                placeholder="Enter mobile number"
                required
              />

              <FormField
                label="Email ID"
                type="text"
                value={formData.emailId}
                onChange={(value) => handleFieldChange("emailId", value)}
                placeholder="Enter email address"
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
          title="Scan Vendor ID/Barcode"
        />
      </div>
    </Layout>
  );
};