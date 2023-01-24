import React, { useState } from "react";

export default function CreateListing() {
  const [formData, setFormData] = useState({
    type: "",
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
    offer,
  } = formData;
  function onChangeHandler() {}
  return (
    <div className=" max-w-md mx-auto">
      <h1 className=" my-6 text-3xl font-bold text-center">Create Listing</h1>
      <form>
        <p className="p-2 font-semibold text-lg">Sell/Rent</p>
        <div className="flex gap-5">
          <button
            type="button"
            className={`uppercase text-sm font-medium w-full px-7 py-3 shadow-sm rounded ${
              type === "sell" ? "bg-slate-600" : "bg-white"
            }`}
            id="type"
            value="sell"
          >
            Sell
          </button>
          <button
            type="button"
            className={`uppercase text-sm font-medium w-full px-7 py-3 shadow-sm rounded ${
              type === "rent" ? "bg-slate-600" : "bg-white"
            }`}
            id="type"
            value="Rent"
          >
            Rent
          </button>
        </div>
        <div className="mt-6">
          <p className="p-2 font-semibold text-lg">Name</p>
          <input
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
              id="bed"
              value={bed}
              onchange={onChangeHandler}
              type="number"
              min="1"
              className="p-3 mt-1 w-full border rounded border-gray-400 focus:border-slate-600 text-gray-700 text-lg"
            />
          </div>
          <div>
            <p className="p-2 font-semibold text-lg">Baths</p>
            <input
              id="bath"
              value={bath}
              onchange={onChangeHandler}
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
              id="parking"
              value="Yes"
            >
              Yes
            </button>
            <button
              type="button"
              className={`uppercase text-sm font-medium w-full px-7 py-3 shadow-sm rounded ${
                !parkingSpot ? "bg-slate-600" : "bg-white"
              }`}
              id="parking"
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
            >
              Yes
            </button>
            <button
              type="button"
              className={`uppercase text-sm font-medium w-full px-7 py-3 shadow-sm rounded ${
                !furnished ? "bg-slate-600" : "bg-white"
              }`}
              id="furnished"
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
              id="furnished"
            >
              Yes
            </button>
            <button
              type="button"
              className={`uppercase text-sm font-medium w-full px-7 py-3 shadow-sm rounded ${
                !offer ? "bg-slate-600" : "bg-white"
              }`}
              id="furnished"
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
              onchange={onChangeHandler}
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
                onchange={onChangeHandler}
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
              onchange={onChangeHandler}
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
