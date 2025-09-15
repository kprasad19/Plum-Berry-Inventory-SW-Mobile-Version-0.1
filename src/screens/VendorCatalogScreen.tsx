import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import { Layout } from "../components/Layout";
import { FormField } from "../components/FormField";
import { BarcodeScanner } from "../components/BarcodeScanner";
import { DataList } from "../components/DataList";
import { TemplateDownloader } from "../components/TemplateDownloader";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { PlusIcon, ScanIcon, ListIcon, WormIcon as FormIcon } from "lucide-react";
import { Vendor } from "../types";

export const VendorCatalogScreen: React.FC = () => {
  const navigate = useNavigate();
  const { 
    vendors, 
    addVendor, 
    updateVendor, 
    deleteVendor, 
    selectedVendor, 
    setSelectedVendor 
  } = useData();
  
  const [showScanner, setShowScanner] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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
    
    const vendorData: Omit<Vendor, 'id'> = {
      vendorId: formData.vendorId,
      name: formData.vendorName,
      gstNumber: formData.gstNumber,
      address: formData.address,
      contactPerson: formData.contactPerson,
      mobileNumber: formData.mobileNumber,
      emailId: formData.emailId,
    };

    if (isEditing && selectedVendor) {
      updateVendor(selectedVendor.id, vendorData);
      setSelectedVendor(null);
      setIsEditing(false);
    } else {
      addVendor(vendorData as Vendor);
    }

    // Reset form
    setFormData({
      vendorId: "",
      vendorName: "",
      gstNumber: "",
      address: "",
      contactPerson: "",
      mobileNumber: "",
      emailId: "",
    });
    setShowForm(false);
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleScanSuccess = (scannedCode: string) => {
    // Auto-fill Vendor ID field with scanned code
    setFormData({ ...formData, vendorId: scannedCode });
  };

  const handleAdd = () => {
    setIsEditing(false);
    setSelectedVendor(null);
    setFormData({
      vendorId: "",
      vendorName: "",
      gstNumber: "",
      address: "",
      contactPerson: "",
      mobileNumber: "",
      emailId: "",
    });
    setShowForm(true);
  };

  const handleEdit = (vendor: Vendor) => {
    setIsEditing(true);
    setSelectedVendor(vendor);
    setFormData({
      vendorId: vendor.vendorId,
      vendorName: vendor.name,
      gstNumber: vendor.gstNumber,
      address: vendor.address,
      contactPerson: vendor.contactPerson,
      mobileNumber: vendor.mobileNumber,
      emailId: vendor.emailId,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      deleteVendor(id);
    }
  };

  const renderVendorItem = (vendor: Vendor) => (
    <div>
      <div className="font-semibold text-[#913472]">{vendor.name}</div>
      <div className="text-sm text-gray-600">ID: {vendor.vendorId}</div>
      <div className="text-sm text-gray-600">GST: {vendor.gstNumber}</div>
      <div className="text-sm text-gray-600">Contact: {vendor.contactPerson}</div>
      <div className="text-sm text-gray-600">Mobile: {vendor.mobileNumber}</div>
    </div>
  );

  return (
    <Layout title="VENDOR CATALOG DETAILS" onBack={() => navigate("/dashboard")}>
      <div className="space-y-4">
        {/* Action Buttons */}
        <div className="flex gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowScanner(true)}
            className="border-[#913472] text-[#913472] hover:bg-[#913472] hover:text-white"
          >
            <ScanIcon className="w-4 h-4 mr-2" />
            Scan Vendor ID
          </Button>
          <TemplateDownloader templateType="vendor" className="flex-1" />
        </div>

        {/* CRUD Buttons */}
        <div className="flex gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAdd}
            className="flex-1 bg-[#cc95de80] border-[#913472] text-[#913472] hover:bg-[#cc95de]"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowForm(!showForm)}
            className="flex-1 bg-[#cc95de80] border-[#913472] text-[#913472] hover:bg-[#cc95de]"
          >
            {showForm ? <ListIcon className="w-4 h-4 mr-2" /> : <FormIcon className="w-4 h-4 mr-2" />}
            {showForm ? 'View List' : 'Show Form'}
          </Button>
        </div>

        {/* Conditional Rendering: Form or List */}
        {showForm ? (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#913472]">
                {isEditing ? 'Edit Vendor' : 'Add New Vendor'}
              </CardTitle>
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

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="flex-1 bg-[#913472] hover:bg-[#7a2d61] text-white py-3 text-lg font-semibold"
                  >
                    {isEditing ? 'Update' : 'Submit'}
                  </Button>
                  {isEditing && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setSelectedVendor(null);
                        setShowForm(false);
                      }}
                      className="border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <DataList
            data={vendors}
            onEdit={handleEdit}
            onDelete={handleDelete}
            renderItem={renderVendorItem}
            getItemId={(vendor) => vendor.id}
            emptyMessage="No vendors added yet. Click 'Add' to create your first vendor."
          />
        )}

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