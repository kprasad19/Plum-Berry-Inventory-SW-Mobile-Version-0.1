import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Product, Vendor, PurchaseData, ConsumptionData, ClosingStock } from '../types';

interface DataContextType {
  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Vendors
  vendors: Vendor[];
  addVendor: (vendor: Vendor) => void;
  updateVendor: (id: string, vendor: Partial<Vendor>) => void;
  deleteVendor: (id: string) => void;
  
  // Purchase Data
  purchaseData: PurchaseData[];
  addPurchaseData: (data: PurchaseData) => void;
  updatePurchaseData: (id: string, data: Partial<PurchaseData>) => void;
  deletePurchaseData: (id: string) => void;
  
  // Consumption Data
  consumptionData: ConsumptionData[];
  addConsumptionData: (data: ConsumptionData) => void;
  updateConsumptionData: (id: string, data: Partial<ConsumptionData>) => void;
  deleteConsumptionData: (id: string) => void;
  
  // Closing Stock
  closingStock: ClosingStock[];
  addClosingStock: (data: ClosingStock) => void;
  updateClosingStock: (id: string, data: Partial<ClosingStock>) => void;
  deleteClosingStock: (id: string) => void;
  
  // Selected items for editing
  selectedProduct: Product | null;
  selectedVendor: Vendor | null;
  selectedPurchaseData: PurchaseData | null;
  selectedConsumptionData: ConsumptionData | null;
  selectedClosingStock: ClosingStock | null;
  
  setSelectedProduct: (product: Product | null) => void;
  setSelectedVendor: (vendor: Vendor | null) => void;
  setSelectedPurchaseData: (data: PurchaseData | null) => void;
  setSelectedConsumptionData: (data: ConsumptionData | null) => void;
  setSelectedClosingStock: (data: ClosingStock | null) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [products, setProducts] = useLocalStorage<Product[]>('products', []);
  const [vendors, setVendors] = useLocalStorage<Vendor[]>('vendors', []);
  const [purchaseData, setPurchaseData] = useLocalStorage<PurchaseData[]>('purchaseData', []);
  const [consumptionData, setConsumptionData] = useLocalStorage<ConsumptionData[]>('consumptionData', []);
  const [closingStock, setClosingStock] = useLocalStorage<ClosingStock[]>('closingStock', []);
  
  const [selectedProduct, setSelectedProduct] = useLocalStorage<Product | null>('selectedProduct', null);
  const [selectedVendor, setSelectedVendor] = useLocalStorage<Vendor | null>('selectedVendor', null);
  const [selectedPurchaseData, setSelectedPurchaseData] = useLocalStorage<PurchaseData | null>('selectedPurchaseData', null);
  const [selectedConsumptionData, setSelectedConsumptionData] = useLocalStorage<ConsumptionData | null>('selectedConsumptionData', null);
  const [selectedClosingStock, setSelectedClosingStock] = useLocalStorage<ClosingStock | null>('selectedClosingStock', null);

  // Product functions
  const addProduct = (product: Product) => {
    setProducts([...products, { ...product, id: Date.now().toString() }]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // Vendor functions
  const addVendor = (vendor: Vendor) => {
    setVendors([...vendors, { ...vendor, id: Date.now().toString() }]);
  };

  const updateVendor = (id: string, updatedVendor: Partial<Vendor>) => {
    setVendors(vendors.map(v => v.id === id ? { ...v, ...updatedVendor } : v));
  };

  const deleteVendor = (id: string) => {
    setVendors(vendors.filter(v => v.id !== id));
  };

  // Purchase Data functions
  const addPurchaseData = (data: PurchaseData) => {
    setPurchaseData([...purchaseData, { ...data, id: Date.now().toString() }]);
  };

  const updatePurchaseData = (id: string, updatedData: Partial<PurchaseData>) => {
    setPurchaseData(purchaseData.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const deletePurchaseData = (id: string) => {
    setPurchaseData(purchaseData.filter(p => p.id !== id));
  };

  // Consumption Data functions
  const addConsumptionData = (data: ConsumptionData) => {
    setConsumptionData([...consumptionData, { ...data, id: Date.now().toString() }]);
  };

  const updateConsumptionData = (id: string, updatedData: Partial<ConsumptionData>) => {
    setConsumptionData(consumptionData.map(c => c.id === id ? { ...c, ...updatedData } : c));
  };

  const deleteConsumptionData = (id: string) => {
    setConsumptionData(consumptionData.filter(c => c.id !== id));
  };

  // Closing Stock functions
  const addClosingStock = (data: ClosingStock) => {
    setClosingStock([...closingStock, { ...data, id: Date.now().toString() }]);
  };

  const updateClosingStock = (id: string, updatedData: Partial<ClosingStock>) => {
    setClosingStock(closingStock.map(c => c.id === id ? { ...c, ...updatedData } : c));
  };

  const deleteClosingStock = (id: string) => {
    setClosingStock(closingStock.filter(c => c.id !== id));
  };

  const value: DataContextType = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    vendors,
    addVendor,
    updateVendor,
    deleteVendor,
    purchaseData,
    addPurchaseData,
    updatePurchaseData,
    deletePurchaseData,
    consumptionData,
    addConsumptionData,
    updateConsumptionData,
    deleteConsumptionData,
    closingStock,
    addClosingStock,
    updateClosingStock,
    deleteClosingStock,
    selectedProduct,
    selectedVendor,
    selectedPurchaseData,
    selectedConsumptionData,
    selectedClosingStock,
    setSelectedProduct,
    setSelectedVendor,
    setSelectedPurchaseData,
    setSelectedConsumptionData,
    setSelectedClosingStock,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};