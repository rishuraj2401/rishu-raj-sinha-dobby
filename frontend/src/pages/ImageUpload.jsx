import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { uploadImage } from '../utils/api';
import { AuthContext } from '../components/usercontext/userContext';
import Login from '../components/Auth/Login';

const ImageUpload= () => {
  const {user}=useContext(AuthContext)

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [formData, setFormData]= useState({name:name, image:image,user:user})
  const [previewUrl, setPreviewUrl] = useState(null);
  const [flag,setFlag]= useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if(!name)setName(file.name);
    // Image preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };


  const uploadToCloudinary = async () => {
    const imageData = new FormData();
    imageData.append("file", image);
    imageData.append("upload_preset", "dzdedmky ");

    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/aababcab/image/upload",
        imageData
      );

      const imageUrl = data.secure_url;
      console.log("imageurl", imageUrl);
    setFormData({name, imageUrl, user:user})

      // setFormData((prevState) => ({
      //   ...prevState,
      //  image:imageUrl,
      // }));
      setFlag(true);
      console.log(formData)
      // setFormData((prevData) => ({ ...prevData, boardPhotoUrl: imageUrl }));
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  };
  
  const handleSubmit = () => {
    // e.preventDefault()
    console.log('Image Name:', name);
    console.log('Image File:', image);
    uploadImage(formData)
    setImage(null);
    setName('');
    setPreviewUrl(null);
  };
  useEffect(()=>{
    console.log("thishis ");
    // handleSubmit()
      if(flag){
        console.log("aer baba",formData);
        handleSubmit()
        setFlag(false)
      }
  },[flag])

  return (
    <>
    {!user?(<><Login/></>):(<>
      <div className="h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* <form onSubmit=""> */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name of Image
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Upload Image
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="image"
              type="file"
              onChange={handleImageChange}
            />
          </div>
          {previewUrl && (
            <div className="mb-4 size-40">
              <img className="w-full h-auto" src={previewUrl} alt="Preview" />
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit" onClick={uploadToCloudinary}
            >
              Upload
            </button>
          </div>
        {/* </form> */}
      </div>
    </div>
</>)}
       </>
  );
};

export default ImageUpload;
