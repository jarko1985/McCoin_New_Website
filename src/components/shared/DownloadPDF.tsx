// components/DownloadButton.tsx
import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';

interface DownloadButtonProps {
  fileName: string;
  buttonText?: string;
  className?: string;
}

const DownloadPDF = ({ 
  fileName, 
  buttonText = 'Download PDF', 
  className = '' 
}: DownloadButtonProps) => {
  const handleDownload = () => {
    // Construct the file path
    const filePath = `/documents/${fileName}`;
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Download started!');
  };

  return (
    <button
      onClick={handleDownload}
      className={`flex items-center gap-2 px-4 py-2 border border-transparent hover:border-white bg-white hover:bg-[#07153b] text-[#07153b] hover:text-white cursor-pointer rounded-lg hover:scale-95 transition-all duration-200 ${className}`}
    >
      <FiDownload className="text-lg" />
      <span>{buttonText}</span>
    </button>
  );
};

export default DownloadPDF;