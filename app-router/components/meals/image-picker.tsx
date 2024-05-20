"use client";

import classes from "@/styles/image-picker.module.css";
import Image from "next/image";
import { useRef, useState } from "react";

interface ImagePickerProps {
  readonly label?: string;
  readonly name?: string;
}

function ImagePicker({ label, name }: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<any>(null);
  const imageInput = useRef<HTMLInputElement>(null);

  const handlePickClick = () => {
    imageInput.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.previwe}>
          {pickedImage ? (
            <Image
              src={pickedImage?.toString()}
              alt="The image selected by the user."
              width={200}
              height={200}
            />
          ) : (
            <p>No image picked yet.</p>
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}

export default ImagePicker;
