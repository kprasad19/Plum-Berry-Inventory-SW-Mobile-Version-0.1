import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Layout } from '../components/Layout';
import { FormField } from '../components/FormField';
import { BarcodeScanner } from '../components/BarcodeScanner';
import { useData } from '../context/DataContext';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../types';

interface ProductCatalogScreenProps {
  onBack: () => void;
}

export const ProductCatalogScreen: React.FC<ProductCatalogScreenProps> = ({ onBack }) => {
  const { products, addProduct, updateProduct, deleteProduct } = useData();
  const [showScanner, setShowScanner] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    sku: '',
    productName: '',
    measurementType: '',
    measurementValue: '',
    brand: '',
    category: '',
    gst: '',
    mrp: '',
  });

  const handleSubmit = () => {
    if (!formData.sku || !formData.productName || !formData.mrp) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const productData: Omit<Product, 'id'> = {
      sku: formData.sku,
      name: formData.productName,
      measurementType: formData.measurementType,
      measurementValue: formData.measurementValue,
      brand: formData.brand,
      category: formData.category,
      gst: formData.gst,
      mrp: parseFloat(formData.mrp) || 0,
    };

    if (isEditing && editingProduct) {
      updateProduct(editingProduct.id, productData);
      Alert.alert('Success', 'Product updated successfully');
    } else {
      addProduct(productData as Product);
      Alert.alert('Success', 'Product added successfully');
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      sku: '',
      productName: '',
      measurementType: '',
      measurementValue: '',
      brand: '',
      category: '',
      gst: '',
      mrp: '',
    });
    setShowForm(false);
    setIsEditing(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsEditing(true);
    setFormData({
      sku: product.sku,
      productName: product.name,
      measurementType: product.measurementType,
      measurementValue: product.measurementValue,
      brand: product.brand,
      category: product.category,
      gst: product.gst,
      mrp: product.mrp.toString(),
    });
    setShowForm(true);
  };

  const handleDelete = (product: Product) => {
    Alert.alert(
      'Delete Product',
      `Are you sure you want to delete "${product.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteProduct(product.id);
            Alert.alert('Success', 'Product deleted successfully');
          },
        },
      ]
    );
  };

  const handleScanSuccess = (scannedCode: string) => {
    setFormData({ ...formData, sku: scannedCode });
  };

  return (
    <Layout title="PRODUCT CATALOG DETAILS" onBack={onBack}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => setShowScanner(true)}
          >
            <Ionicons name="scan" size={16} color="#913472" />
            <Text style={styles.scanButtonText}>Scan SKU</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.downloadButton}>
            <Ionicons name="download" size={16} color="white" />
            <Text style={styles.downloadButtonText}>Download Template</Text>
          </TouchableOpacity>
        </View>

        {/* CRUD Buttons */}
        <View style={styles.crudButtons}>
          <TouchableOpacity
            style={styles.crudButton}
            onPress={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            <Ionicons name="add" size={16} color="#913472" />
            <Text style={styles.crudButtonText}>Add</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.crudButton}
            onPress={() => setShowForm(!showForm)}
          >
            <Ionicons name={showForm ? "list" : "create"} size={16} color="#913472" />
            <Text style={styles.crudButtonText}>{showForm ? 'View List' : 'Show Form'}</Text>
          </TouchableOpacity>
        </View>

        {/* Form or List */}
        {showForm ? (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </Text>
            
            <FormField
              label="SKU"
              value={formData.sku}
              onChange={(value) => setFormData({ ...formData, sku: value })}
              placeholder="Enter SKU"
              required
            />

            <FormField
              label="Product Name"
              value={formData.productName}
              onChange={(value) => setFormData({ ...formData, productName: value })}
              placeholder="Enter product name"
              required
            />

            <FormField
              label="Measurement Type"
              type="select"
              value={formData.measurementType}
              onChange={(value) => setFormData({ ...formData, measurementType: value })}
              options={[
                { value: 'kg', label: 'Kilogram (kg)' },
                { value: 'g', label: 'Gram (g)' },
                { value: 'l', label: 'Liter (l)' },
                { value: 'ml', label: 'Milliliter (ml)' },
                { value: 'pcs', label: 'Pieces' },
              ]}
              required
            />

            <FormField
              label="Measurement Value"
              value={formData.measurementValue}
              onChange={(value) => setFormData({ ...formData, measurementValue: value })}
              placeholder="Enter measurement value"
              required
            />

            <FormField
              label="Brand"
              value={formData.brand}
              onChange={(value) => setFormData({ ...formData, brand: value })}
              placeholder="Enter brand name"
              required
            />

            <FormField
              label="Category"
              type="select"
              value={formData.category}
              onChange={(value) => setFormData({ ...formData, category: value })}
              options={[
                { value: 'food', label: 'Food & Beverages' },
                { value: 'electronics', label: 'Electronics' },
                { value: 'clothing', label: 'Clothing' },
                { value: 'household', label: 'Household Items' },
              ]}
              required
            />

            <FormField
              label="GST (%)"
              type="select"
              value={formData.gst}
              onChange={(value) => setFormData({ ...formData, gst: value })}
              options={[
                { value: '0', label: '0%' },
                { value: '5', label: '5%' },
                { value: '12', label: '12%' },
                { value: '18', label: '18%' },
                { value: '28', label: '28%' },
              ]}
              required
            />

            <FormField
              label="MRP"
              value={formData.mrp}
              onChange={(value) => setFormData({ ...formData, mrp: value })}
              placeholder="Enter MRP"
              required
            />

            <View style={styles.formButtons}>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>
                  {isEditing ? 'Update' : 'Submit'}
                </Text>
              </TouchableOpacity>
              
              {isEditing && (
                <TouchableOpacity style={styles.cancelButton} onPress={resetForm}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ) : (
          <View style={styles.listContainer}>
            {products.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  No products added yet. Click 'Add' to create your first product.
                </Text>
              </View>
            ) : (
              products.map((product) => (
                <View key={product.id} style={styles.listItem}>
                  <View style={styles.itemContent}>
                    <Text style={styles.itemTitle}>{product.name}</Text>
                    <Text style={styles.itemDetail}>SKU: {product.sku}</Text>
                    <Text style={styles.itemDetail}>Brand: {product.brand}</Text>
                    <Text style={styles.itemDetail}>Category: {product.category}</Text>
                    <Text style={styles.itemDetail}>MRP: ₹{product.mrp}</Text>
                  </View>
                  <View style={styles.itemActions}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => handleEdit(product)}
                    >
                      <Ionicons name="create" size={16} color="#913472" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDelete(product)}
                    >
                      <Ionicons name="trash" size={16} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        )}

        <BarcodeScanner
          isOpen={showScanner}
          onClose={() => setShowScanner(false)}
          onScanSuccess={handleScanSuccess}
          title="Scan Product SKU/Barcode"
        />
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  scanButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#913472',
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  scanButtonText: {
    color: '#913472',
    fontSize: 14,
    fontWeight: '500',
  },
  downloadButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#913472',
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  crudButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  crudButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(204, 149, 222, 0.5)',
    borderWidth: 1,
    borderColor: '#913472',
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  crudButtonText: {
    color: '#913472',
    fontSize: 14,
    fontWeight: '500',
  },
  formContainer: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 12,
    padding: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#913472',
    marginBottom: 16,
    textAlign: 'center',
  },
  formButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#913472',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    minWidth: 80,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  listContainer: {
    gap: 12,
  },
  emptyState: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
  listItem: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#913472',
    marginBottom: 4,
  },
  itemDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  itemActions: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 16,
  },
  editButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#913472',
    borderRadius: 6,
    padding: 8,
  },
  deleteButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ef4444',
    borderRadius: 6,
    padding: 8,
  },
});