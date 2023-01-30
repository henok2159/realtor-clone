import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import Spinner from "../component/spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { BiCopy } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { FaParking, FaBath } from "react-icons/fa";
import { IoMdBed } from "react-icons/io";
import { GiKitchenTap } from "react-icons/gi";
import { getAuth } from "firebase/auth";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function Listing() {
  const navigate = useNavigate();
  const [listing, setListing] = useState();
  const [loading, setLoading] = useState(true);
  const [showLinkCopy, setShowLinkCopy] = useState(false);
  const [sendToLandLord, setSendToLandLord] = useState(false);
  const [landLord, setLandlod] = useState();
  const [message, setMessage] = useState("");
  const auth = getAuth();
  const param = useParams();
  SwiperCore.use(Autoplay, Navigation, Pagination, EffectFade);
  useEffect(() => {
    setLoading(true);
    async function fetchListing() {
      const docRef = doc(db, "listings", param.listingId);
      const ls = await getDoc(docRef);
      if (ls.exists()) {
        setListing(ls.data());
        const Uref = ls.data().userRef;
        const user = await getDoc(doc(db, "users", Uref));
        setLandlod(user.data());
        console.log(user.data());
      } else {
        navigate("/*");
        toast.error("it seems you lost");
      }
      setLoading(false);
    }
    fetchListing();
  }, [param.listingId, navigate]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade, Pagination, Navigation, Autoplay]}
        autoplay={{ delay: 3000 }}
      >
        {listing.imageUrl.map((url, index) => {
          return (
            <SwiperSlide key={index}>
              <div
                className=" h-[400px] object-cover "
                style={{ background: `url(${url}) center no-repeat` }}
              ></div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div
        onClick={() => {
          setShowLinkCopy(true);
          navigator.clipboard.writeText(window.location.href);
          setTimeout(() => {
            setShowLinkCopy(false);
          }, 1500);
        }}
        className="flex z-10 bg-green-700 p-4 rounded-full fixed top-[10%] right-[10%] box-border active:bg-green-900 transition duration-200 ease-in-out"
      >
        <BiCopy className="text-white" />
      </div>
      {showLinkCopy && (
        <div className="fixed z-10 top-[15%] right-[12%] bg-white rounded-md p-3 shadow-md transition duration-200 ">
          <p>link copied</p>
        </div>
      )}
      <div className=" my-6 flex w-full max-w-6xl flex-col  md:flex-row  mx-auto   rounded-md shadow-md  ">
        <div className="flex flex-col md:flex-1  bg-white py-8 px-6">
          <div className="flex">
            <h1 className="text-blue-900 text-xl mr-8 font-semibold">{`${listing.name}
          `}</h1>
            <h1 className="text-blue-900 text-xl">
              {`${"Price: $"} ${new Intl.NumberFormat().format(
                listing.regularPrice
              )}
            ${listing.type === "rent" ? "/month" : ""}`}
            </h1>
          </div>
          <div className=" mt-2 flex items-center">
            <MdLocationOn className="mr-2 text-green-700" />
            <p>{listing.address}</p>
          </div>
          <div className="flex gap-6 text-white font-semibold">
            <div className="mt-6 px-8 py-2 bg-red-700 rounded-md shadow-md bl w-max">
              {listing.type === "rent" ? "For Rent" : "For Sale"}
            </div>
            {listing.offer && (
              <div className="mt-6 px-8 py-2 bg-green-700 rounded-md shadow-md bl w-max text-white font-semibold">{`$${new Intl.NumberFormat().format(
                listing.regularPrice - listing.discountPrice
              )} discount`}</div>
            )}
          </div>
          <div className="flex mt-6">
            <h3 className=" font-semibold mr-1">description - </h3>
            <p>{listing.description}</p>
          </div>
          <div className="flex  font-semibold text-sm mt-6 gap-8 items-center flex-wrap">
            <div className="flex gap-2 items-center">
              <IoMdBed className="text-[18px]" />
              <p className="">
                {listing.bed === 1 ? "1 bed" : `${listing.bed} beds`}
              </p>
            </div>
            <div className="flex  gap-2 items-center">
              <FaBath className="text-[18px]" />
              <p>{listing.bath === 1 ? "1 bath" : `${listing.bath} baths`}</p>
            </div>
            <div className="flex  gap-2 items-center">
              <FaParking className="text-[18px]" />
              <p className="">
                {listing.parkingSpot ? "Parking Spot" : "Not Parking Spot"}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <GiKitchenTap className="text-[18px]" />
              <p className="">
                {listing.furnished ? "Furnished" : "Not Furnished"}
              </p>
            </div>
          </div>
          {listing.userRef !== auth.currentUser?.uid && (
            <div>
              {sendToLandLord ? (
                <div className="mt-6">
                  <p>{`contact ${landLord.name} for ${listing.name}`}</p>
                  <textarea
                    className="mt-2 border border-gray-400 w-full py-2 px-4 rounded h-[100px]"
                    placeholder="please your request"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  ></textarea>
                  <a
                    href={`mailto:${landLord.email}?Subject=${listing.name}&body=${message}`}
                  >
                    <div className="mt-6 uppercase px-6 py-3 bg-blue-600 text-center rounded shadow-md active:bg-blue-900 hover:bg-blue-800 cursor-pointer text-white">
                      send message
                    </div>
                  </a>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setSendToLandLord(true);
                  }}
                  className="mt-6 uppercase px-6 py-3 bg-blue-600 text-center rounded shadow-md active:bg-blue-900 hover:bg-blue-800 cursor-pointer text-white"
                >
                  Contact LandLord
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex md:flex-1  w-full h-[400px] bg-white px-6 py-8 overflow-x-hidden ">
          <MapContainer
            center={[listing.lattitude, listing.longitude]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[listing.lattitude, listing.longitude]}>
              <Popup>{` estimated location ${listing.name}`}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  );
}
