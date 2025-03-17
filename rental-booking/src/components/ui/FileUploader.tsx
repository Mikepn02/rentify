import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

export const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="flex cursor-pointer  flex-col items-center justify-center gap-3 rounded-md border border-dashed border-primary-light p-5">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <img
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt="uploaded image"
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <img
            src="/icons/upload.svg"
            width={40}
            height={40}
            alt="upload"
          />
          <div className="flex flex-col justify-center gap-2 text-center">
            <p className="text-sm">
              <span className="text-primary-light">Click to upload </span>
              or drag and drop
            </p>
            <p className="text-12-regular">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </>
      )}
    </div>
  );
};
