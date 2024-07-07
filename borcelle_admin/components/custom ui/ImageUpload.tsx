"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { LoadingSpinner } from "./Spinner";

const ImageUpload = ({imageUrl, setImageUrl}: {imageUrl: string, setImageUrl: (url: string) => void}) => {
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (e: any) => {
    const imageFile = e.target.files[0];
    if (!imageFile) {
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    setUploading(true);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          params: {
            key: "b451e6493eb94fafe8c52be3e3843fd2",
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImageUrl(response.data.data.url);
    } catch (error) {
      console.error("Error uploading the image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl("");
  };

  return (
    <div>
      {uploading && <LoadingSpinner className="my-8" />}
      {imageUrl && (
        <div className="my-8 flex flex-wrap items-center gap-4">
          {/* TODO: loop to all the images */}
          <div className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
              <Button
                className="bg-red-1 text-white"
                type="button"
                onClick={handleRemoveImage}
                size="sm"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={imageUrl}
              alt="Uploaded"
              className="object-cover rounded-lg"
              fill
            />
          </div>
        </div>
      )}
    <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
};

export default ImageUpload;
