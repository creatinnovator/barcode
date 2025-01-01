import { useEffect, useRef } from "react";
import {
  Html5QrcodeScanner,
  Html5QrcodeScanType,
  QrcodeErrorCallback,
  QrcodeSuccessCallback,
} from "html5-qrcode";
import { Html5QrcodeScannerConfig } from "html5-qrcode/esm/html5-qrcode-scanner";

interface ScannerProps {
  onSuccess?: (result: string) => void;
  onError?: (error: string) => void;
}

const Scanner = ({ onSuccess, onError }: ScannerProps) => {
  const scanner = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    scanner.current = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        disableFlip: false,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        showZoomSliderIfSupported: true,
        aspectRatio: 2,
        videoConstraints: {
          advanced: [
            {
              facingMode: "environment",
            },
          ],
        },
      } as Html5QrcodeScannerConfig,
      false
    );

    const success: QrcodeSuccessCallback = (data: string) => {
      if (!onSuccess) {
        return;
      }

      onSuccess(data);
    };

    const error: QrcodeErrorCallback = (errorMessage: string) => {
      if (!onError) {
        return;
      }

      onError(errorMessage);
    };

    scanner.current.render(success, error);

    return () => {
      scanner.current?.clear().catch((error: unknown) => {
        console.error("Failed to clear scanner. ", error);
      });
    };
  }, [onSuccess, onError]);

  return <div id="reader" style={{ maxWidth: "500px" }} aria-hidden="false" />;
};

export default Scanner;
