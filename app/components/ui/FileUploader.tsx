"use client";

import { useState, useRef } from "react";
import { UploadCloud, CheckCircle, Loader2 } from "lucide-react";

interface FileUploaderProps {
  onUploadSuccess: (url: string, publicId: string) => void;
}

export default function FileUploader({ onUploadSuccess }: FileUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!validTypes.includes(file.type)) {
      setError("Please select a valid PDF or Word document.");
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setError("File is too large. Max size is 5MB.");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);
      
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "ds0g6w4to"; 
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "sdc_preset";
      
      formData.append("upload_preset", uploadPreset);
      
      // For PDFs, we can upload them as image/upload and Cloudinary converts/stores them as PDFs,
      // or raw/upload. Since we want a preview, image/upload with PDF is fine.
      // But typically, PDF should be uploaded as 'auto' or 'image' resource type.
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.secure_url) {
        // Change file extension to .pdf if cloudinary appends something weird, but data.secure_url is usually correct.
        setUploadedUrl(data.secure_url);
        onUploadSuccess(data.secure_url, data.public_id);
      } else {
        setError(data.error?.message || "Upload failed. Please check Cloudinary configuration.");
      }
    } catch (err: any) {
      console.error(err);
      setError("An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      <div 
        className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all ${
          isUploading ? "bg-gray-50 border-gray-300" : 
          uploadedUrl ? "bg-green-50 border-green-300" : 
          "border-[#0071e3]/30 hover:border-[#0071e3] bg-white cursor-pointer"
        }`}
        onClick={() => !isUploading && !uploadedUrl && fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange}
          disabled={isUploading || !!uploadedUrl}
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-[#0071e3] animate-spin" />
            <p className="text-sm font-medium text-gray-600">Uploading Resume...</p>
            <p className="text-xs text-gray-500">This might take a moment.</p>
          </div>
        ) : uploadedUrl ? (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <p className="text-sm font-medium text-green-700">Resume Uploaded Successfully!</p>
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setUploadedUrl(null);
                onUploadSuccess("", "");
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="text-xs text-red-500 hover:underline mt-1"
            >
              Remove
            </button>
            <a 
              href={uploadedUrl?.includes('cloudinary.com') && uploadedUrl?.includes('/upload/') 
                ? uploadedUrl.replace('/upload/', '/upload/fl_attachment/') 
                : uploadedUrl || '#'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs text-[#0071e3] hover:underline mt-1"
            >
              Preview Resume
            </a>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <UploadCloud className="w-8 h-8 text-[#0071e3]" />
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">Click to upload your resume</p>
              <p className="text-xs text-gray-500 mt-1">PDF or Word Document (Max 5MB)</p>
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </div>
  );
}
