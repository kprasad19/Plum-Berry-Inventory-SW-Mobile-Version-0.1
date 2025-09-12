import React, { useState, useRef, useEffect } from "react";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { X, Camera, Upload } from "lucide-react";

interface BarcodeScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (result: string) => void;
  title?: string;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  isOpen,
  onClose,
  onScanSuccess,
  title = "Scan Barcode/QR Code"
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string>("");
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && isScanning) {
      startScanner();
    }
    
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, [isOpen, isScanning]);

  const startScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear();
    }

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        supportedScanTypes: [
          Html5Qrcode.SCAN_TYPE_CAMERA,
          Html5Qrcode.SCAN_TYPE_FILE
        ]
      },
      false
    );

    scanner.render(
      (decodedText) => {
        setIsScanning(false);
        onScanSuccess(decodedText);
        onClose();
        scanner.clear();
      },
      (error) => {
        console.warn("QR Code scan error:", error);
      }
    );

    scannerRef.current = scanner;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const html5QrCode = new Html5Qrcode("qr-reader-file");
    
    html5QrCode.scanFile(file, true)
      .then((decodedText) => {
        onScanSuccess(decodedText);
        onClose();
      })
      .catch((error) => {
        setError("Could not scan the uploaded image. Please try again.");
        console.error("File scan error:", error);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold text-[#913472]">
            {title}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isScanning ? (
            <div className="space-y-3">
              <Button
                onClick={() => setIsScanning(true)}
                className="w-full bg-[#913472] hover:bg-[#7a2d61] text-white"
              >
                <Camera className="w-4 h-4 mr-2" />
                Start Camera Scan
              </Button>
              
              <div className="text-center text-sm text-gray-500">or</div>
              
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-[#913472] text-[#913472] hover:bg-[#913472] hover:text-white"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div id="qr-reader" className="w-full"></div>
              <div id="qr-reader-file" className="hidden"></div>
              <Button
                variant="outline"
                onClick={() => setIsScanning(false)}
                className="w-full"
              >
                Cancel Scan
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};