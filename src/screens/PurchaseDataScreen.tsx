import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { FormField } from "../components/FormField";
import { BarcodeScanner } from "../components/BarcodeScanner";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { UploadIcon, DownloadIcon, PlusIcon, EditIcon, Trash2Icon, ScanIcon } from "lucide-react";

export const PurchaseDataScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"bill" | "details">("bill");
  const [showScanner, setShowScanner] = useState(false);
  const [billFormData, setBillFormData] = useState({
    vendorId: "",
    vendorName: "",
    gstNumber: "",
    address: "",
    contactPerson: "",
    mobileNumber: "",
    emailId: "",
  });
  const [detailsFormData, setDetailsFormData] = useState({
    vendorName: "",
    date: "",
    block: "",
    invoiceNumber: "",
    billUpload: "",
    billStatus: "",
  });

  const handleBillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Bill data:", billFormData);
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Details data:", detailsFormData);
  };

  const handleBillFieldChange = (field: string, value: string) => {
    setBillFormData({ ...billFormData, [field]: value });
  };

  const handleDetailsFieldChange = (field: string, value: string) => {
    setDetailsFormData({ ...detailsFormData, [field]: value });
  };

  const handleScanSuccess = (scannedCode: string) => {
    if (activeTab === "bill") {
      // Auto-fill Vendor ID field with scanned code
      setBillFormData({ ...billFormData, vendorId: scannedCode });
    } else {
      // Auto-fill Invoice Number field with scanned code
      setDetailsFormData({ ...detailsFormData, invoiceNumber: scannedCode });
    }
  };

  return (
    <Layout title="PURCHASE DATA DETAILS" onBack={() => navigate("/dashboard")}>
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
            Scan Code
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

        {/* Tab Buttons */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={activeTab === "bill" ? "default" : "outline"}
            onClick={() => setActiveTab("bill")}
            className={`flex-1 ${
              activeTab === "bill"
                ? "bg-[#913472] text-white"
                : "bg-[#cc95de80] border-[#913472] text-[#913472] hover:bg-[#cc95de]"
            }`}
          >
            Purchase Details
          </Button>
          <Button
            variant={activeTab === "details" ? "default" : "outline"}
            onClick={() => setActiveTab("details")}
            className={`flex-1 ${
              activeTab === "details"
                ? "bg-[#913472] text-white"
                : "bg-[#cc95de80] border-[#913472] text-[#913472] hover:bg-[#cc95de]"
            }`}
          >
            Approve Details
          </Button>
        </div>

        {/* Forms */}
        {activeTab === "bill" && (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#913472]">Purchase Data Bill Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBillSubmit} className="space-y-4">
                <FormField
                  label="Vendor ID"
                  value={billFormData.vendorId}
                  onChange={(value) => handleBillFieldChange("vendorId", value)}
                  placeholder="Enter vendor ID"
                  required
                />

                <FormField
                  label="Vendor Name"
                  value={billFormData.vendorName}
                  onChange={(value) => handleBillFieldChange("vendorName", value)}
                  placeholder="Enter vendor name"
                  required
                />

                <FormField
                  label="GST Number"
                  value={billFormData.gstNumber}
                  onChange={(value) => handleBillFieldChange("gstNumber", value)}
                  placeholder="Enter GST number"
                  required
                />

                <FormField
                  label="Address"
                  type="textarea"
                  value={billFormData.address}
                  onChange={(value) => handleBillFieldChange("address", value)}
                  placeholder="Enter address"
                  required
                />

                <FormField
                  label="Contact Person Name"
                  value={billFormData.contactPerson}
                  onChange={(value) => handleBillFieldChange("contactPerson", value)}
                  placeholder="Enter contact person name"
                  required
                />

                <FormField
                  label="Mobile Number"
                  value={billFormData.mobileNumber}
                  onChange={(value) => handleBillFieldChange("mobileNumber", value)}
                  placeholder="Enter mobile number"
                  required
                />

                <FormField
                  label="Email ID"
                  value={billFormData.emailId}
                  onChange={(value) => handleBillFieldChange("emailId", value)}
                  placeholder="Enter email ID"
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
        )}

        {activeTab === "details" && (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#913472]">Purchase Data Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                <FormField
                  label="Vendor Name"
                  value={detailsFormData.vendorName}
                  onChange={(value) => handleDetailsFieldChange("vendorName", value)}
                  placeholder="Enter vendor name"
                  required
                />

                <FormField
                  label="Date"
                  type="date"
                  value={detailsFormData.date}
                  onChange={(value) => handleDetailsFieldChange("date", value)}
                  required
                />

                <FormField
                  label="Block"
                  type="select"
                  value={detailsFormData.block}
                  onChange={(value) => handleDetailsFieldChange("block", value)}
                  options={[
                    { value: "block-a", label: "Block A" },
                    { value: "block-b", label: "Block B" },
                    { value: "block-c", label: "Block C" },
                  ]}
                  required
                />

                <FormField
                  label="Invoice Number"
                  value={detailsFormData.invoiceNumber}
                  onChange={(value) => handleDetailsFieldChange("invoiceNumber", value)}
                  placeholder="Enter invoice number"
                  required
                />

                <FormField
                  label="Bill Upload"
                  type="file"
                  onChange={(value) => handleDetailsFieldChange("billUpload", value)}
                />

                <FormField
                  label="Bill Status"
                  type="radio"
                  value={detailsFormData.billStatus}
                  onChange={(value) => handleDetailsFieldChange("billStatus", value)}
                  radioOptions={[
                    { value: "Paid", label: "Paid" },
                    { value: "UnPaid", label: "UnPaid" },
                  ]}
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
        )}

        <BarcodeScanner
          isOpen={showScanner}
          onClose={() => setShowScanner(false)}
          onScanSuccess={handleScanSuccess}
          title={activeTab === "bill" ? "Scan Vendor ID/Barcode" : "Scan Invoice/Barcode"}
        />
      </div>
    </Layout>
  );
};