"use client";

import { Button } from "@mui/material";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Html5QrcodeScannerConfig } from "html5-qrcode/esm/html5-qrcode-scanner";
import { useState } from "react";

const startScan = async (
  targetId: string,
  onSuccess?: (result: string) => void,
  onError?: (error: string) => void,
  useFrontCamera?: boolean
) => {
  const scanner = new Html5QrcodeScanner(
    targetId,
    {} as Html5QrcodeScannerConfig,
    false
  );

  scanner.render(
    (result) => {
      console.log(result);
      if (onSuccess) {
        onSuccess(result);
      }
    },
    (error) => {
      if (
        !error.includes("No barcode or QR code detected") &&
        !error.includes("No MultiFormat Readers were able to detect the code")
      ) {
        if (onError) {
          onError(error);
        }
      }
    }
  );

  return scanner;
};

const stopScan = async (scanner: Html5QrcodeScanner) => {
  scanner.clear();
};

const Page = () => {
  const [scanStarted, setScanStarted] = useState(false);
  const [data, setData] = useState<string | null>("no data");
  const [useFrontCamera, setUseFrontCamera] = useState(true);
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);

  const onStartScan = async () => {
    await startScanning();
  };

  const onStopScan = async () => {
    await stopScanning();
  };

  const onScanSuccess = (result: string) => {
    setData(result);
  };

  const onScanError = (error: string) => {
    console.error(error);
  };

  const startScanning = async (useFrontCamera?: boolean) => {
    setScanStarted(true);
    const instance = await startScan(
      "scanner",
      onScanSuccess,
      onScanError,
      useFrontCamera
    );

    setScanner(instance);
  };
  const stopScanning = async () => {
    await stopScan(scanner!);
    setScanStarted(false);
  };

  const onToggleCamera = async () => {
    await stopScanning();
    setUseFrontCamera(!useFrontCamera);
    await startScanning(!useFrontCamera);
  };

  return (
    <div>
      {!scanStarted && (
        <div>
          <Button onClick={onStartScan}>Start Scan</Button>
        </div>
      )}

      {scanStarted && (
        <div>
          <Button onClick={onToggleCamera}>Switch camera</Button>
        </div>
      )}

      {scanStarted && (
        <div
          style={{
            position: "fixed",
            zIndex: 10,
            top: "50px",
          }}
        >
          <Button onClick={onStopScan}>Stop Scan</Button>
        </div>
      )}
      {data && (
        <div
          style={{
            position: "fixed",
            zIndex: 10,
            bottom: "0px",
            color: "yellowgreen",
          }}
        >
          {data}
        </div>
      )}

      <div id="scanner"></div>
    </div>
  );
};

export default Page;
