"use client";

import { useState, useRef } from "react";
import { UploadCloud, CheckCircle, Loader2, Film, Image as ImageIcon } from "lucide-react";

interface HeroMediaUploaderProps {
  onUploadSuccess: (url: string, publicId: string, type: 'image' | 'video') => void;
}

export default function HeroMediaUploader({ onUploadSuccess }: HeroMediaUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const convertToWebP = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  resolve(blob);
                } else {
                  reject(new Error("Canvas to Blob failed"));
                }
              },
              "image/webp",
              0.8 // quality
            );
          } else {
            reject(new Error("Canvas context failed"));
          }
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");

    if (!isVideo && !isImage) {
      setError("Please select a valid image or video file.");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      let fileToUpload: Blob | File = file;
      let resourceType = isVideo ? "video" : "image";

      if (isImage) {
        // Convert images to webp
        fileToUpload = await convertToWebP(file);
      }

      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", fileToUpload, isImage ? "image.webp" : file.name);
      
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "ds0g6w4to"; 
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "sdc_preset";
      
      formData.append("upload_preset", uploadPreset);
      
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.secure_url) {
        setUploadedUrl(data.secure_url);
        onUploadSuccess(data.secure_url, data.public_id, isVideo ? 'video' : 'image');
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
          accept="image/*,video/*" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange}
          disabled={isUploading || !!uploadedUrl}
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-[#0071e3] animate-spin" />
            <p className="text-sm font-medium text-gray-600">Uploading Media...</p>
            <p className="text-xs text-gray-500">Large videos might take a while.</p>
          </div>
        ) : uploadedUrl ? (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <p className="text-sm font-medium text-green-700">Media Uploaded Successfully!</p>
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setUploadedUrl(null);
                onUploadSuccess("", "", 'image');
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="text-xs text-red-500 hover:underline mt-1"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-2">
              <ImageIcon className="w-8 h-8 text-[#0071e3]" />
              <Film className="w-8 h-8 text-[#0071e3]" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">Click to upload image or video</p>
              <p className="text-xs text-gray-500 mt-1">Images will be optimized, Videos kept original</p>
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </div>
  );
}
