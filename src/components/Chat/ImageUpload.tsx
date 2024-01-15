import { useContext, useState } from "react";
import { isAxiosError } from "axios";
import { axiosChangeAvatar, axiosUploadImage } from "../../API";
import DataContext from "../../context/DataContext";
import { DataContextProps } from "../../types/common";

const ImageUpload = () => {
  const { setUserData } = useContext(DataContext) as DataContextProps;
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleUpload = async () => {
    try {
      if (!selectedImage) {
        console.error("No image selected");
        return;
      }
      const image = await axiosUploadImage(selectedImage);
      const { data } = await axiosChangeAvatar({ url: image.data.url });
      setUserData(data);
      localStorage.setItem("userData", JSON.stringify(data));
    } catch (err) {
      if (isAxiosError(err)) console.log(err);
    } finally {
      setSelectedImage(null);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] as File | undefined;
    setSelectedImage(file || null);
  };

  return (
    <div className="w-1/2">
      <h1 className="text-center mb-2">Upload profile picture</h1>
      {selectedImage && (
        <div className="w-full flex-col flex items-center">
          <img
            className="h-24 w-24 rounded-full object-cover border-4 border-blue-300"
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <div className="flex space-x-4">
            <button onClick={() => setSelectedImage(null)}>Remove</button>
            <button onClick={() => handleUpload()}>Upload</button>
          </div>
        </div>
      )}
      {!selectedImage && (
        <div className="dark:bg-gray-950 w-full h-24 rounded-lg relative border-2 border-dashed">
          <div className="w-full h-24 absolute flex justify-center items-center">
            Drop down image or click here
          </div>
          <input
            className="bg-slate-50 p-4 rounded-xl w-full dark:bg-gray-950"
            title=" "
            type="file"
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
