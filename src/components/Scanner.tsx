import { RefObject, useCallback, useEffect, useRef } from "react";
import {
  Html5Qrcode,
  Html5QrcodeScannerState,
  QrcodeErrorCallback,
  QrcodeSuccessCallback,
} from "html5-qrcode";

interface ScannerProps {
  onSuccess?: (result: string) => void;
  onError?: (error: string) => void;
  opened?: boolean;
}

let scanner: Html5Qrcode | undefined;

const start = (
  onSuccess: QrcodeSuccessCallback,
  onError: QrcodeErrorCallback
) => {
  const config = {
    verbose: false,
    fps: 10,
    qrbox: { width: 250, height: 250 },
  };
  scanner = new Html5Qrcode("reader");

  scanner.start({ facingMode: "environment" }, config, onSuccess, onError);
  return scanner;
};

const dispose = (scanner?: RefObject<Html5Qrcode | undefined>) => {
  if (!scanner || !scanner.current) {
    return;
  }
  const state = scanner.current?.getState();
  if (state && state === Html5QrcodeScannerState.SCANNING) {
    scanner.current.stop().then(() => scanner.current?.clear());
  } else {
    scanner.current?.clear();
  }
  scanner.current = undefined;
};

const Scanner = ({ onSuccess, onError, opened }: ScannerProps) => {
  const scanner = useRef<Html5Qrcode | undefined>(undefined);
  const success: QrcodeSuccessCallback = useCallback(
    (data: string) => {
      if (!onSuccess) {
        return;
      }

      dispose(scanner);
      onSuccess(data);
    },
    [onSuccess]
  );

  const error: QrcodeErrorCallback = useCallback(
    (errorMessage: string) => {
      if (!onError) {
        return;
      }

      if (
        errorMessage.includes("No barcode or QR code detected") ||
        errorMessage.includes(
          "No MultiFormat Readers were able to detect the code"
        )
      ) {
        return;
      }

      onError(errorMessage);
    },
    [onError]
  );

  useEffect(() => {
    if (scanner.current) {
      return;
    }
    scanner.current = start(success, error);
    return () => {
      if (opened) {
        return;
      }

      dispose(scanner);
    };
  }, [error, success, opened]);

  return <div id="reader" style={{ maxWidth: "600px" }} aria-hidden="false" />;
};

export default Scanner;
