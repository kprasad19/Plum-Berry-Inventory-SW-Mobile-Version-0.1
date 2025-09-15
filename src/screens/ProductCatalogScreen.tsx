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
import { PlusIcon, EditIcon, Trash2Icon, ScanIcon, ListIcon, FormIcon } from "lucide-react";
import { Product } from "../types";

export const ProductCatalogScreen: React.FC = () => {
  const navigate = useNavigate();
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    selectedProduct, 
    setSelectedProduct 
  } = useData();
  
  const [showScanner, setShowScanner] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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
    
    const productData: Omit<Product, 'id'> = {
      sku: formData.sku,
      name: formData.productName,
      measurementType: formData.measurementType,
      measurementValue: formData.measurementValue,
      brand: formData.brand,
      category: formData.category,
      gst: formData.gst,
      mrp: parseFloat(formData.mrp) || 0,
      imageUrl: formData.productImage,
    };

    if (isEditing && selectedProduct) {
      updateProduct(selectedProduct.id, productData);
      setSelectedProduct(null);
      setIsEditing(false);
    } else {
      addProduct(productData as Product);
    }

    // Reset form
    setFormData({
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
    setShowForm(false);
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleScanSuccess = (scannedCode: string) => {
    // Auto-fill SKU field with scanned code
    setFormData({ ...formData, sku: scannedCode });
  };

  const handleAdd = () => {
    setIsEditing(false);
    setSelectedProduct(null);
    setFormData({
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
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setIsEditing(true);
    setSelectedProduct(product);
    setFormData({
      sku: product.sku,
      productName: product.name,
      measurementType: product.measurementType,
      measurementValue: product.measurementValue,
      brand: product.brand,
      category: product.category,
      gst: product.gst,
      mrp: product.mrp.toString(),
      productImage: product.imageUrl || "",
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const renderProductItem = (product: Product) => (
    <div>
      <div className="font-semibold text-[#913472]">{product.name}</div>
      <div className="text-sm text-gray-600">SKU: {product.sku}</div>
      <div className="text-sm text-gray-600">Brand: {product.brand}</div>
      <div className="text-sm text-gray-600">Category: {product.category}</div>
      <div className="text-sm text-gray-600">MRP: ₹{product.mrp}</div>
    </div>
  );

  return (
    <Layout title="PRODUCT CATALOG DETAILS" onBack={() => navigate("/dashboard")}>
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
            Scan SKU
          </Button>
          <TemplateDownloader templateType="product" className="flex-1" />
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
                {isEditing ? 'Edit Product' : 'Add New Product'}
              </CardTitle>
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
                        setSelectedProduct(null);
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
            data={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
            renderItem={renderProductItem}
            getItemId={(product) => product.id}
            emptyMessage="No products added yet. Click 'Add' to create your first product."
          />
        )}

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