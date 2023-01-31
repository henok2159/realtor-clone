import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import Spinner from "./spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { useNavigate } from "react-router-dom";

export default function Slider() {
  const navigate = useNavigate();
  const [listing, setListing] = useState();
  const [loading, setLoading] = useState(true);
  SwiperCore.use(Autoplay, Navigation, Pagination, EffectFade);
  useEffect(() => {
    async function fetchCollection() {
      const c = collection(db, "listings");
      const q = query(c, orderBy("timeStamp", "desc"), limit(7));
      const querySnap = await getDocs(q);
      let listing = [];
      querySnap.forEach((doc) => {
        listing.push({ id: doc.id, data: doc.data() });
      });
      setListing(listing);
      setLoading(false);
    }
    fetchCollection();
  }, []);
  if (loading) {
    return <Spinner />;
  }
  if (listing.length === 0) {
    return <p>sorry, we don't have house listing for now</p>;
  }

  return (
    listing && (
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade, Pagination, Navigation, Autoplay]}
        autoplay={{ delay: 3000 }}
      >
        {listing.map(({ data, id }) => {
          return (
            <SwiperSlide
              key={id}
              onClick={() => {
                navigate(`/listing/catagory/${data.type}/${id}`);
              }}
            >
              <div
                className="relative h-[400px] w-full overflow-hidden"
                style={{
                  background: `url(${data.imageUrl[0]}) center no-repeat
            `,
                  backgroundSize: "cover",
                }}
              >
                <p className="absolute top-3 left-1 p-2 rounded-br-3xl text-[#f1faee] bg-[#457b9d] max-w-[90%]">
                  {data.name}
                </p>
                <p className="absolute bottom-2 left-1 p-2 rounded-tr-3xl text-[#f1faee] bg-[#e63946] max-w-[90%]">
                  {`$${data.discountPrice ?? data.regularPrice}${
                    data.type === "sell" ? "" : " / Month"
                  }`}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    )
  );
}
