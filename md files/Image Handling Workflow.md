opic: Image Handling Workflow
  This document outlines how Singh Dental Care manages visual assets through a high-performance pipeline that balances image
  quality with site speed.

  1. The Core Philosophy: "WebP by Default"
  To ensure the website remains "Apple-fast," every image uploaded by an admin goes through a transformation layer before it hits
  the cloud.
   * Conversion: Images (PNG, JPG, HEIC) are intercepted in the browser and converted to WebP format using the HTML5 Canvas API.
   * Compression: We apply a 0.8 quality compression ratio, significantly reducing file size without visible loss in quality on
     high-resolution displays.

  2. The Cloudinary Pipeline
  We use Cloudinary as our Image CDN (Content Delivery Network).
   * Unsigned Uploads: To simplify the frontend, we use "Unsigned Upload Presets" (sdc_preset). This allows the client-side code to
     upload directly to Cloudinary without exposing sensitive API secrets.
   * Secure Delivery: All images are served over https using Cloudinary’s secure_url, ensuring no "Mixed Content" warnings on the
     site.

  ---

  3. Cover Images vs. Inline Content
  The system distinguishes between images that serve as "Metadata" and images that serve as "Content."

  ┌──────────────┬─────────────────────────────────────────────────┬────────────────────────────────────────────────────────┐
  │ Feature      │ Cover Images (Standalone)                       │ Inline Images (Rich Text)                              │
  ├──────────────┼─────────────────────────────────────────────────┼────────────────────────────────────────────────────────┤
  │ Used In      │ Blog Thumbnails, Doctor Profiles, Posters       │ Blog Body, Disease Descriptions                        │
  │ Component    │ ImageUploader.tsx                               │ TiptapEditor.tsx                                       │
  │ Data Storage │ Stored as a String URL in the MongoDB document. │ Embedded as an <img> tag within the JSON/HTML content. │
  │ Behavior     │ Strictly one image per field. Replaces the      │ Multiple images allowed. Support for resizing and      │
  │              │ previous one.                                   │ alignment.                                             │
  │ Verification │ Provides immediate "Success" feedback with a    │ Injected directly into the cursor position of the      │
  │              │ public ID.                                      │ editor.                                                │
  └──────────────┴─────────────────────────────────────────────────┴────────────────────────────────────────────────────────┘
  ---

  4. Technical Integration Details

  A. How ImageUploader works:
   1. Admin selects a file.
   2. convertToWebP() creates a Blob.
   3. fetch() sends the Blob to https://api.cloudinary.com/v1_1/[cloud_name]/image/upload.
   4. The secure_url is passed to the onUploadSuccess callback, which the parent form (e.g., BlogsManager) saves to the database.

  B. How TiptapEditor integrates images:
   1. The editor uses the tiptap-extension-resize-image extension.
   2. When the image icon is clicked, it triggers a hidden file input.
   3. The same WebP conversion and Cloudinary upload logic occurs.
   4. Once the URL is returned, the editor runs:

   1     editor.chain().focus().setImage({ src: data.secure_url }).run();
   5. This embeds the image into the document's flow, allowing it to be saved as part of the rich-text body.

  ---

  5. Summary for Developers
   * Cloud Name: ds0g6w4to (Default)
   * Upload Preset: sdc_preset
   * Environment Variables: Ensure NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET are set in production
     to override fallbacks.


                          