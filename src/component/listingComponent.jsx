import React from "react";
import { Link } from "react-router-dom";
import { ImLocation2 } from "react-icons/im";
import { MdEdit, MdDelete } from "react-icons/md";
import Moment from "react-moment";

export default function listingComponent(props) {
  return (
    <li
      id={props.id}
      className="relative w-full list-none shadow hover:shadow-lg bg-white rounded overflow-hidden"
    >
      <Link
        className=" "
        to={`/listing/catagory/${props.data.type}/${props.id}`}
      >
        <img
          className=" h-52 w-full object-cover hover:scale-105 duration-200 ease-in"
          src={props.data.imageUrl[0]}
          loading="lazy"
          alt="home"
        />
        <div className=" absolute top-2 left-2 text-sm font-semibold text-white bg-blue-600 px-2 py-1 rounded-md">
          <Moment fromNow>{props.data.timeStamp?.toDate()}</Moment>
        </div>

        <div className="mx-2">
          <p className="flex items-center font-light">
            <ImLocation2 className=" text-green-700 mr-1" />
            {props.data.address}
          </p>
          <h2 className=" font-semibold truncate text-lg">{props.data.name}</h2>
          <p className=" text-red-800">
            {props.data.offer ? (
              <span className="flex justify-between items-center flex-wrap">
                <p className="  flex ">
                  $ {new Intl.NumberFormat().format(props.data.discountPrice)}
                  {props.data.type === "rent" ? <p>/month</p> : null}
                </p>
                <p className=" line-through flex text-[#457b96]">
                  $ {new Intl.NumberFormat().format(props.data.regularPrice)}
                  {props.data.type === "rent" ? <p>/month</p> : null}
                </p>
              </span>
            ) : (
              <span>
                <p className=" flex">
                  $ {new Intl.NumberFormat().format(props.data.regularPrice)}
                  {props.data.type === "rent" ? <p>/month</p> : null}
                </p>
              </span>
            )}
          </p>
          <div className="flex  font-semibold text-sm">
            <p className="mr-4">
              {props.data.bed === 1 ? "1 bed" : `${props.data.bed} beds`}
            </p>
            <p>
              {props.data.bath === 1 ? "1 bath" : `${props.data.bath} baths`}
            </p>
          </div>
        </div>
      </Link>
      {props.onDelete && (
        <div className="flex absolute bottom-2 right-2">
          <MdEdit
            className="mr-2 text-blue-700 cursor-pointer"
            onClick={() => props.onEdit(props.id)}
          />
          <MdDelete
            className="text-red-500 cursor-pointer"
            onClick={() => props.onDelete(props.id)}
          />
        </div>
      )}
    </li>
  );
}
