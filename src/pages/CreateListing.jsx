import React, { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../component/spinner";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { uuidv4 } from "@firebase/util";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function CreateListing() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bed: 1,
    bath: 1,
    offer: true,
    parkingSpot: true,
    furnished: false,
    address: "",
    description: "",
    regularPrice: 0,
    discountPrice: 0,
    image: {},
    lattitude: 0,
    longitude: 0,
  });
  const {
    type,
    name,
    bed,
    bath,
    parkingSpot,
    furnished,
    address,
    description,
    regularPrice,
    discountPrice,
    image,
    offer,
    lattitude,
    longitude,
  } = formData;
  function onChangeHandler(e) {
    let boolean = null;
    if (e.target.value === "Yes") {
      boolean = true;
    }
    if (e.target.value === "No") {
      boolean = false;
    }
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }
  async function storeImage(image) {
    return new Promise((resolve, reject) => {
      const storage = getStorage();

      const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          reject("unable to upload");
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  }
  async function onSubmitHandler(e) {
    e.preventDefault();
    setLoading(true);
    if (+regularPrice < +discountPrice) {
      setLoading(false);
      toast.error("discount price can't be higher than regular price");
      return;
    }
    if (image.length > 6) {
      setLoading(false);
      toast.error(
        `maximum number of image you can upload is six,but you try to ${image.length} images`
      );
      return;
    }
    const imageUrl = await Promise.all(
      [...image].map((image) => storeImage(image))
    ).catch((error) => {
      toast.error("something happen " + error);
      setLoading(false);
    });
    const formDataCopy = {
      ...formData,
      imageUrl: imageUrl,
      userRef: auth.currentUser.uid,
      timeStamp: serverTimestamp(),
    };

    delete formDataCopy.image;
    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    setLoading(false);
    navigate(`/profile`);
    toast.success(`${formData.type} house create successfully`);
  }
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className=" max-w-md mx-auto">
      <h1 className=" my-6 text-3xl font-bold text-center">Create Listing</h1>
      <form onSubmit={onSubmitHandler}>
        <p className="p-2 font-semibold text-lg">Sell/Rent</p>
        <div className="flex gap-5">
          <button
            type="button"
            className={`uppercase text-sm font-medium w-full px-7 py-3 shadow-sm rounded ${
              type === "sell" ? "bg-slate-600" : "bg-white"
            }`}
            id="type"
            value="sell"
            onClick={onChangeHandler}
          >
            Sell
          </button>

          <button
            type="button"
            className={`uppercase text-sm font-medium w-full px-7 py-3 shadow-sm rounded ${
              type === "rent" ? "bg-slate-600" : "bg-white"
            }`}
            id="type"
            value="rent"
            onClick={onChangeHandler}
          >
            Rent
          </button>
        </div>

        <div className="mt-6">
          <p className="p-2 font-semibold text-lg">Name</p>
          <input
            required
            maxLength="32"
            min="10"
            value={name}
            id="name"
            onChange={onChangeHandler}
            type="text"
            placeholder="Name"
            className="p-3 mt-1 w-full border rounded border-gray-400 focus:border-slate-600 text-gray-700 text-lg"
          />
        </div>
        <div className="mt-6 flex gap-5">
          <div>
            <p className="p-2 font-semibold text-lg">Beds</p>
            <input
              required
              id="bed"
              value={bed}
              onChange={onChangeHandler}
              type="number"
              min="1"
              className="p-3 mt-1 w-full border rounded border-gray-400 focus:border-slate-600 text-gray-700 text-lg"
            />
          </div>
          <div>
            <p className="p-2 font-semibold text-lg">Baths</p>
            <input
              id="bath"
              required
              value={bath}
              onChange={onChangeHandler}
              type="number"
              min="1"
              className="p-3 mt-1 w-full border rounded border-gray-400 focus:border-slate-600 text-gray-700 text-lg"
            />
          </div>
        </div>
        <div className="mt-6">
          <p className="p-2 font-semibold text-lg">Parking Spot</p>
          <div className="flex gap-5">
            <button
              type="button"
              className={`uppercase text-sm font-medium w-full px-7 py-3 shadow-sm rounded ${
                parkingSpot ? "bg-slate-600" : "bg-white"
              }`}
              id="parkingSpot"
              value="Yes"
              onClick={onChangeHandler}
            >
              Yes
            </button>
            <button
              type="button"
              className={`uppercase text-sm font-medium w-full px-7 py-3 shadow-sm rounded ${
                !parkingSpot ? "bg-slate-600" : "bg-white"
              }`}
              id="parkingSpot"
              value="No"
              onClick={onChangeHandler}
            >
              No
            </button>
          </div>
        </div>
        <div className="mt-6">
          <p className="p-2 font-semibold text-lg">Furnished</p>
          <div className="flex gap-5">
            <button
              type="button"
              className={`uppercase text-sm font-medium w-full px-7 py-3 shadow-sm rounded ${
                furnished ? "bg-slate-600" : "bg-white"
              }`}
              id="furnished"
              value="Yes"
              onClick={onChangeHandler}
            >
              Yes
            </button>
            <button
              type="button"
              className={`uppercase text-sm font-medium w-full px-7 py-3 shadow-sm rounded ${
                !furnished ? "bg-slate-600" : "bg-white"
              }`}
              id="furnished"
              value="No"
              onClick={onChangeHandler}
            >
              No
            </button>
          </div>
        </div>
        <div className="mt-6">
          <p className="p-2 font-semibold text-lg">Offers</p>
          <div className="flex gap-5">
            <button
              type="button"
              className={`uppercase text-sm font-medium w-full px-7 py-3 shadow-sm rounded ${
                offer ? "bg-slate-600" : "bg-white"
              }`}
              id="offer"
              value="Yes"
              onClick={onChangeHandler}
            >
              Yes
            </button>
            <button
              type="button"
              className={`uppercase text-sm font-medium w-full px-7 py-3 shadow-sm rounded ${
                !offer ? "bg-slate-600" : "bg-white"
              }`}
              id="offer"
              value="No"
              onClick={onChangeHandler}
            >
              No
            </button>
          </div>
        </div>
        <div className="mt-6">
          <p className="p-2 font-semibold text-lg">Address</p>
          <textarea
            required
            value={address}
            id="address"
            onChange={onChangeHandler}
            type="text"
            placeholder="Address"
            className="p-3 mt-1 w-full border rounded border-gray-400 focus:border-slate-600 text-gray-700 text-lg"
          />
        </div>
        <div className="flex gap-5 w-full">
          <div className="w-full">
            <p className="p-2 font-semibold text-lg">lattitude</p>
            <input
              className="p-3 mt-1 text-center w-full border rounded border-gray-400 focus:border-slate-600 text-gray-700 text-lg"
              type="number"
              min="-90"
              max="90"
              value={lattitude}
              id="lattitude"
              onChange={onChangeHandler}
            />
          </div>
          <div className="w-full">
            <p className="p-2 font-semibold text-lg">Longitude</p>
            <input
              className="p-3 mt-1 text-center w-full border rounded border-gray-400 focus:border-slate-600 text-gray-700 text-lg"
              type="number"
              min="-180"
              max="180"
              value={longitude}
              id="longitude"
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <div className="mt-6">
          <p className="p-2 font-semibold text-lg">Description</p>
          <textarea
            value={description}
            id="description"
            onChange={onChangeHandler}
            type="text"
            placeholder="Description"
            className="p-3 mt-1 w-full border rounded border-gray-400 focus:border-slate-600 text-gray-700 text-lg"
            required
          />
        </div>
        <div className="mt-6">
          <p className="p-2 font-semibold text-lg">Regular Price</p>
          <div className="flex gap-5 items-center">
            <input
              required
              type="number"
              id="regularPrice"
              onChange={onChangeHandler}
              value={regularPrice}
              min="1"
              className="p-3 mt-1 w-50 border rounded border-gray-400 focus:border-slate-600 text-gray-700 text-lg"
            />
            {type === "rent" && <p className="mr-32 font-semibold">/month</p>}
          </div>
        </div>
        {offer && (
          <div className="mt-6">
            <p className="p-2 font-semibold text-lg">Discount Price</p>
            <div className="flex gap-5 items-center">
              <input
                required
                type="number"
                id="discountPrice"
                onChange={onChangeHandler}
                value={discountPrice}
                min="0"
                className="p-3 mt-1 w-50 border rounded border-gray-400 focus:border-slate-600 text-gray-700 text-lg"
              />
              {type === "rent" && <p className="mr-32 font-semibold">/month</p>}
            </div>
          </div>
        )}
        <div className="my-6">
          <p className="p-2 font-semibold text-lg">Image</p>
          <p className="px-2 text-gray-400">
            the first image will be the cover (max 6)
          </p>
          <div className="w-full bg-white p-4">
            <input
              type="file"
              accept=".jpg,.jpeg,.png "
              onChange={onChangeHandler}
              id="images"
              multiple
              required
            />
          </div>
        </div>
        <button className="bg-blue-600 w-full p-4 mb-6 text-sm uppercase font-semibold text-white rounded shadow hover:bg-blue-800">
          create Listing
        </button>
      </form>
    </div>
  );
}
