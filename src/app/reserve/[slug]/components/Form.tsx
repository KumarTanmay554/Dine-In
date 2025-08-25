"use client";
import React, { useEffect, useState } from "react";
import reserving from "../../../../../pages/api/restaurant/[slug]/reserving";
import { PrismaClient } from "@prisma/client";
import { useParams, useSearchParams } from "next/navigation";

interface Restaurant {
  id: number;
  name: string;
  slug: string;
  open_time: string;
  close_time: string;
}
interface SearchParams{size?:string,day?:string,time?:string,slug?:string,seatId?:string}

const reservation = async(searchparams:SearchParams)=>{
  const size = searchparams.size
  const day = searchparams.day;
  const time = searchparams.time;
  const slug = searchparams.slug;
  console.log("search params",searchparams);
}

// useEffect(()=>{
//   reservation()
// })
export default function Form() {
  const {slug} = useParams<{slug:string}>()!;
  const searchp = useSearchParams();
  const day = searchp?.get("day");
  const time = searchp?.get("time");
  const size = searchp?.get("size");
  const seatid = searchp?.get("seatid");
  const ids = seatid?.split(",").map((i) => parseInt(i, 10)) || [];
  // console.log("search params",seatid);
  // const restaurant = fetchRestaurantBySlug(slug);
  // console.log("restaurant", restaurant);
  // console.log({slug});
  const [input, setInput] = useState({
    bookFname: "",
    bookLname: "",
    bookEmail: "",
    bookPhone: "",
    bookOccasion: "",
    bookReq: "",

  });
  
  // console.log(slug);
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<any>(null);

  const handleBooking = async () => {
    try {
      const { data } = await reserving({
        bookFname: input.bookFname,
        bookLname: input.bookLname,
        bookEmail: input.bookEmail,
        bookPhone: input.bookPhone,
        bookOccasion: input.bookOccasion,
        bookReq: input.bookReq,
        slug: slug,
        number_of_people: size ? parseInt(size) : 0,
        time: time ? time : "",
        date: day ? day : "",
        seat_id: ids,
      });
      setResult(data);
      console.log(data)
      console.log("reservind data",result)


      // if(error){
      //   setError(error?.message??error?.error??error);
      //   return;
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="First name"
        onChange={(e)=> setInput({...input,bookFname:e.target.value})}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Last name"
        onChange={(e)=> setInput({...input,bookLname:e.target.value})}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Phone number"
        onChange={(e)=> setInput({...input,bookPhone:e.target.value})}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Email"
        onChange={(e)=> setInput({...input,bookEmail:e.target.value})}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Occasion (optional)"
        onChange={(e)=> setInput({...input,bookOccasion:e.target.value})}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Requests (optional)"
        onChange={(e)=> setInput({...input,bookReq:e.target.value})}
      />
      <button className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
      onClick={handleBooking}
      >
        Complete reservation
      </button>
      <p className="mt-4 text-sm">
        By clicking “Complete reservation” you agree to the Dine-In Terms of Use
        and Privacy Policy. Standard text message rates may apply. You may opt
        out of receiving text messages at any time.
      </p>
    </div>
  );
}
