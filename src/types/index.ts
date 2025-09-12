export interface User {
  id: string;
  username: string;
  role: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  measurementType: string;
  measurementValue: string;
  brand: string;
  category: string;
  gst: string;
  mrp: number;
  imageUrl?: string;
}

export interface Vendor {
  id: string;
  vendorId: string;
  name: string;
  gstNumber: string;
  address: string;
  contactPerson: string;
  mobileNumber: string;
  emailId: string;
}

export interface PurchaseData {
  id: string;
  vendorName: string;
  date: string;
  block: string;
  invoiceNumber: string;
  billUpload?: string;
  billStatus: 'Paid' | 'UnPaid';
}

export interface ConsumptionData {
  id: string;
  sku: string;
  productName: string;
  from: string;
  to: string;
  quantity: number;
  mrp: number;
  enteredBy: string;
}

export interface ClosingStock {
  id: string;
  closingStockId: string;
  sku: string;
  productName: string;
  block: string;
  quantity: number;
  manufactureDate: string;
  expiryDate: string;
}