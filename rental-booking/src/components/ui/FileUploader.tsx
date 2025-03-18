import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type FileUploaderProps = {
  files: string[]; // Now expects an array of image URLs
  onChange: (files: string[]) => void;
};

export const FileUploader = ({ files = [], onChange }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const imageUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
      onChange([...files, ...imageUrls]); // Store URLs, not File objects
    },
    [files, onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: true });

  return (
    <div
      {...getRootProps()}
      className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-dashed border-primary-light p-5"
    >
      <input {...getInputProps()} />
      {files.length > 0 ? (
        files.length === 1 ? (
          <img
            src={files[0]}
            alt="uploaded image"
            className="h-[400px] w-full rounded-md object-cover"
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {files.map((file, index) => (
              <img
                key={index}
                src={file}
                width={150}
                height={150}
                alt={`uploaded image ${index + 1}`}
                className="h-32 w-32 rounded-md object-cover"
              />
            ))}
          </div>
        )
      ) : (
        <>
          <img src="/icons/upload.svg" width={40} height={40} alt="upload" />
          <div className="flex flex-col justify-center gap-2 text-center">
            <p className="text-sm">
              <span className="text-primary-light">Click to upload</span> or drag and drop
            </p>
            <p className="text-12-regular">SVG, PNG, JPG, or GIF (max. 800x400px)</p>
          </div>
        </>
      )}
    </div>
  );
};
