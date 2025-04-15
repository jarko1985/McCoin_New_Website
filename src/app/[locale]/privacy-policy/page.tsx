"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { FcPrivacy } from "react-icons/fc";

const PDFViewer = dynamic(() => import("@/components/custom/PDFViewer"), {
  ssr: false,
  loading: () => (
    <div className="h-64 flex items-center justify-center">
      Loading PDF Viewer...
    </div>
  ),
});

export default function PrivacyPolicyPage() {
  const pdfUrl = "/documents/client_agreement.pdf";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Privacy-Policy.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <div className="space-y-8">
        <div className="text-center">
        <FcPrivacy size={64} className="text-center mx-auto mb-2"/>
          <h1 className="text-3xl font-bold tracking-tight text-[#EC3B3B]">Privacy Policy</h1>
          
          <p className="mt-2 text-white">
            Please review our privacy policy
          </p>
        </div>

        <div className="flex justify-center">
          <Button 
          onClick={handleDownload}
          className="bg-[#07153b] text-[#EC3B3B] border-2 border-[#EC3B3B] shadow-xl hover:bg-[#07153b] group cursor-pointer"
          >
            <Download className="mr-2 h-5 w-5 group-hover:translate-y-1 transition-all duration-300" />
            Download PDF
          </Button>
        </div>

        <div className="mt-8">
          <PDFViewer fileUrl={pdfUrl} />
        </div>
      </div>
    </div>
  );
}
