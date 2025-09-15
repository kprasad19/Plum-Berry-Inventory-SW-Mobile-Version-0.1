import React from 'react';
import { Button } from './ui/button';
import { DownloadIcon } from 'lucide-react';

interface TemplateDownloaderProps {
  templateType: 'product' | 'vendor' | 'purchase' | 'consumption' | 'closing-stock';
  className?: string;
}

export const TemplateDownloader: React.FC<TemplateDownloaderProps> = ({
  templateType,
  className = ""
}) => {
  const generateTemplate = () => {
    let headers: string[] = [];
    let sampleData: string[] = [];

    switch (templateType) {
      case 'product':
        headers = ['SKU', 'Product Name', 'Measurement Type', 'Measurement Value', 'Brand', 'Category', 'GST (%)', 'MRP'];
        sampleData = ['SKU001', 'Sample Product', 'kg', '1', 'Sample Brand', 'Food', '18', '100'];
        break;
      case 'vendor':
        headers = ['Vendor ID', 'Vendor Name', 'GST Number', 'Address', 'Contact Person', 'Mobile Number', 'Email ID'];
        sampleData = ['VEN001', 'Sample Vendor', '22AAAAA0000A1Z5', '123 Sample Street', 'John Doe', '9876543210', 'vendor@example.com'];
        break;
      case 'purchase':
        headers = ['Vendor Name', 'Date', 'Block', 'Invoice Number', 'Bill Status'];
        sampleData = ['Sample Vendor', '2024-01-01', 'Block A', 'INV001', 'Paid'];
        break;
      case 'consumption':
        headers = ['SKU', 'Product Name', 'From', 'To', 'Quantity', 'MRP', 'Entered By'];
        sampleData = ['SKU001', 'Sample Product', 'Warehouse', 'Kitchen', '10', '100', 'Admin'];
        break;
      case 'closing-stock':
        headers = ['Closing Stock ID', 'SKU', 'Product Name', 'Block', 'Quantity', 'Manufacture Date', 'Expiry Date'];
        sampleData = ['CS001', 'SKU001', 'Sample Product', 'Block A', '50', '2024-01-01', '2024-12-31'];
        break;
    }

    const csvContent = [headers.join(','), sampleData.join(',')].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${templateType}-template.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button
      onClick={generateTemplate}
      className={`bg-[#913472] hover:bg-[#7a2d61] text-white ${className}`}
    >
      <DownloadIcon className="w-4 h-4 mr-2" />
      Download Template
    </Button>
  );
};