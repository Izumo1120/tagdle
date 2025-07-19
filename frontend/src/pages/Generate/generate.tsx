import { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import jsPDF from 'jspdf';

const QRCodePDFDownload = () => {
  const qrRef = useRef<HTMLCanvasElement>(null);
  const url = "https://github.co.jp/";

  const downloadPdfWithSize = (size: number) => {
    const canvas = qrRef.current;
    if (!canvas) return;

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [size + 20, size + 20], // 余白含める
    });

    pdf.addImage(imgData, "PNG", 10, 10, size, size);
    pdf.save(`qrcode_${size}mm.pdf`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <QRCodeCanvas
        value={url}
        size={256}
        includeMargin={true}
        ref={qrRef}
      />
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={() => downloadPdfWithSize(50)}>小（50mm）PDF</button>
        <button onClick={() => downloadPdfWithSize(80)}>中（80mm）PDF</button>
        <button onClick={() => downloadPdfWithSize(120)}>大（120mm）PDF</button>
      </div>
    </div>
  );
};

export default QRCodePDFDownload;
