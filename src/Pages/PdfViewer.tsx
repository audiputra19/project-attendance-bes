import React from 'react';
import { useLocation } from 'react-router-dom';

const PdfViewer: React.FC = () => {
  const location = useLocation();
  const pdfUrl = (location.state as { pdfUrl: string })?.pdfUrl || '';

  return (
    <div className="w-full h-screen">
      <iframe
        src={pdfUrl}
        className="w-full h-full border-none"
        title="PDF Viewer"
      />
    </div>
  );
};

export default PdfViewer;
