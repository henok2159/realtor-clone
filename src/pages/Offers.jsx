import React, { useEffect, useState } from "react";
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../component/spinner";
import ListingComponent from "../component/listingComponent";

export default function Offers() {
  const [loading, setLoading] = useState(true);
  const [offerList, setOfferList] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);
  const [totalLength, setTotalLength] = useState(100000);
  useEffect(() => {
    async function fetchListing() {
      try {
        const c = collection(db, "listings");
        const q = query(
          c,
          where("offer", "==", true),
          orderBy("timeStamp", "desc"),
          limit(8)
        );
        const snapshot = await getCountFromServer(q);
        let am = snapshot.data().count;
        setTotalLength(am);
        const querySnap = await getDocs(q);
        const lastV = querySnap.docs[querySnap.docs.length - 1];
        setLastFetch(lastV);
        let listing = [];
        querySnap.forEach((doc) => {
          listing.push({ id: doc.id, data: doc.data() });
        });
        setOfferList(listing);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }

    fetchListing();
  }, []);
  async function showMoreHandler() {
    try {
      const c = collection(db, "listings");
      const q = query(
        c,
        where("offer", "==", true),
        orderBy("timeStamp", "desc"),
        startAfter(lastFetch),
        limit(8)
      );

      const querySnap = await getDocs(q);
      const lastV = querySnap.docs[querySnap.docs.length - 1];

      setLastFetch(lastV);
      let listing = [];
      querySnap.forEach((doc) => {
        listing.push({ id: doc.id, data: doc.data() });
      });
      setOfferList((prevState) => {
        return [...prevState, ...listing];
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  if (loading) {
    return <Spinner />;
  }
  return offerList && offerList.length > 0 ? (
    <div className="w-full p-3 max-w-6xl mx-auto">
      <h1 className="text-3xl text-center font-semibold my-6">Offers</h1>
      <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {offerList.map(({ data, id }) => {
          return <ListingComponent data={data} id={id} />;
        })}
      </ul>
      {lastFetch && +totalLength !== offerList?.length && (
        <div
          onClick={showMoreHandler}
          className="uppercase bg-white shadow-lg mx-auto max-w-max cursor-pointer my-6 px-4 py-2 hover: border hover:border-gray-800 active:bg-slate-200"
        >
          show more
        </div>
      )}
    </div>
  ) : (
    <p>No Offer for Today</p>
  );
}
