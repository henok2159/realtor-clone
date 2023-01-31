import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ListingComponent from "../component/listingComponent";
import Slider from "../component/slider";
import { db } from "../firebase";
import Spinner from "../component/spinner";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [offerList, setOfferList] = useState(null);
  useEffect(() => {
    async function fetchListing() {
      try {
        const c = collection(db, "listings");
        const q = query(
          c,
          where("offer", "==", true),
          orderBy("timeStamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        let listing = [];
        querySnap.forEach((doc) => {
          listing.push({ id: doc.id, data: doc.data() });
        });
        setOfferList(listing);
      } catch (error) {
        console.log(error);
      }
    }

    fetchListing();
  }, []);
  const [rentList, setRentList] = useState(null);
  useEffect(() => {
    async function fetchListing() {
      try {
        const c = collection(db, "listings");
        const q = query(
          c,
          where("type", "==", "rent"),
          orderBy("timeStamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        let listing = [];
        querySnap.forEach((doc) => {
          listing.push({ id: doc.id, data: doc.data() });
        });
        setRentList(listing);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }

    fetchListing();
  }, []);
  const [sellList, setSellList] = useState(null);
  useEffect(() => {
    async function fetchListing() {
      try {
        const c = collection(db, "listings");
        const q = query(
          c,
          where("type", "==", "sell"),
          orderBy("timeStamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        let listing = [];
        querySnap.forEach((doc) => {
          listing.push({ id: doc.id, data: doc.data() });
        });
        setSellList(listing);
      } catch (error) {
        console.log(error);
      }
    }

    fetchListing();
  }, []);
  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <Slider />
      <div className=" max-w-6xl p-4 mx-auto">
        <div className="mb-8 mt-6">
          <h2 className=" text-xl font-semibold">Recent Offers</h2>
          <Link
            className="text-blue-600 text-sm hover:text-blue-800 cursor pointer "
            to="/offers"
          >
            show more offer
          </Link>
          {offerList && offerList.length > 0 ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {offerList.map(({ data, id }) => {
                return <ListingComponent data={data} id={id} />;
              })}
            </div>
          ) : (
            <p>sorry we don't have offer today</p>
          )}
        </div>
        <div className="mb-8">
          <h2 className=" text-xl font-semibold">Recent Rent</h2>
          <Link
            className="text-blue-600 text-sm hover:text-blue-800 cursor pointer "
            to="/catagory/rent"
          >
            show more rent
          </Link>
          {rentList && rentList.length > 0 ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {rentList.map(({ data, id }) => {
                return <ListingComponent data={data} id={id} />;
              })}
            </div>
          ) : (
            <p>sorry we don't have rent house today</p>
          )}
        </div>
        <div className="mb-8">
          <h2 className=" text-xl font-semibold">Recent Sell</h2>
          <Link
            className="text-blue-600 text-sm hover:text-blue-800 cursor pointer "
            to="/catagory/sell"
          >
            show more sell
          </Link>
          {sellList && sellList.length > 0 ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sellList.map(({ data, id }) => {
                return <ListingComponent data={data} id={id} />;
              })}
            </div>
          ) : (
            <p>sorry we don't have offer today</p>
          )}
        </div>
      </div>
    </div>
  );
}
