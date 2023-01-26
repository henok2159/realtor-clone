import { getAuth, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FcHome } from "react-icons/fc";
import { useEffect } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import ListingComponent from "../component/listingComponent";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [canEdit, setcanEdit] = useState(false);
  const [listing, setListing] = useState(null);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  const signOutHandler = () => {
    auth.signOut();
    navigate("/");
  };
  async function editNameHandler() {
    // console.log(auth.currentUser.displayName);
    if (canEdit && name !== auth.currentUser.displayName) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        toast.success("your name updated successfully");
      } catch (error) {
        toast.error("something happen when we updating your name");
      }
    }
    setcanEdit(!canEdit);
  }
  const onchangeHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };
  useEffect(() => {
    async function loadListingFromFirebase() {
      const q = query(
        collection(db, "listings"),
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timeStamp", "desc")
      );
      const querysnap = await getDocs(q);
      // console.log(querysnap[0].data());
      let listing = [];
      querysnap.forEach((doc) => {
        listing.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      console.log(listing[1]);
      setListing(listing);
    }
    loadListingFromFirebase();
  }, [auth.currentUser.uid]);
  return (
    <>
      <section>
        <div className="flex flex-col justify-center items-center">
          <h1 className=" uppercase text-2xl my-6  font-bold">My Profile</h1>
          <div className=" w-full  md:w-[60%] lg:w-[40%] xl:w[30% ] p-6">
            <form className=" flex flex-col">
              <input
                className="w-100 border p-2 disable  mb-5 bg-white"
                type="text"
                id="name"
                value={name}
                disabled={!canEdit}
                onChange={onchangeHandler}
              />
              <input
                className="w-100 border p-2 disable  mb-5 bg-white"
                type="text"
                id="email"
                value={email}
                disabled
              />
            </form>
            <div className="flex justify-between">
              <p>
                do you want to change your name?
                <span
                  onClick={editNameHandler}
                  className=" text-red-600 hover:text-red-800 ml-1 cursor-pointer"
                >
                  {canEdit ? "apply change" : "edit"}
                </span>
              </p>
              <p
                onClick={signOutHandler}
                className=" cursor-pointer text-blue-600 hover:text-blue-800"
              >
                sign out
              </p>
            </div>
            <div className="bg-blue-600 mt-6 rounded hover:bg-blue-700 active:bg-blue-900 text-center">
              <button>
                <Link
                  to="/create-listing"
                  className="flex p-3  justify-between items-center"
                >
                  <FcHome className="mr-3 bg-red-200 rounded-full text-3xl" />
                  <p className=" uppercase text-sm font-medium text-white">
                    sell or rent your home
                  </p>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-[90%]   mx-auto">
        <h2 className="mx-auto uppercase font-semibold text-center my-6">
          your Listings
        </h2>
        <div className="grid gap-4  sm:grid-cols-2   lg:grid-cols-3 2xl:grid-cols-4">
          {listing?.map((item) => {
            return <ListingComponent data={item.data} id={item.id} />;
          })}
        </div>
      </section>
    </>
  );
}
