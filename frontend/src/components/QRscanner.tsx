import { useEffect, useRef } from 'react';
import QrScanner from 'qr-scanner';

type Props = {
  onScan: (result: string) => void;
};

const QrScannerComponent = ({ onScan }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const scanner = new QrScanner(
      videoRef.current,
      (result) => {
        onScan(result.data);
        scanner.stop();
      },
      {
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );

    scannerRef.current = scanner;
    scanner.start();

    return () => {
      scanner.stop();
      scanner.destroy();
    };
  }, [onScan]);

  return (
    <video
      ref={videoRef}
      style={{ width: '100%', borderRadius: '8px' }}
      muted
      playsInline
    />
  );
};

export default QrScannerComponent;
