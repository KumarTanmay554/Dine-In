"use client"
import { useParams, useSearchParams } from 'next/navigation';
import React from 'react'
import { convertToDisplayTime, Time } from '../../../../../BookingSize';

export default function Header({image,name}:{
  image:string ,
  name:string
}) {
  const searchParams = useSearchParams();
  const size = searchParams?.get("size");
  const day = searchParams?.get("day");
  const time = searchParams?.get("time");

  // const [date, time] =  ?.split("T")||
  console.log(day)
  console.log(time)
  // console.log(convertToDisplayTime(time ||""))
  
  return (
    <div>
          <h3 className="font-bold">You're almost done!</h3>
          <div className="mt-5 flex">
            <img
              src={image}
              alt=""
              className="w-32 h-18 rounded"
            />
            <div className="ml-4">
              <h1 className="text-3xl font-bold">
                 {name}
              </h1>
              <div className="flex mt-3">
                <p className="mr-6">{day}</p>
                <p className="mr-6">{convertToDisplayTime(time as Time)}</p>
                <p className="mr-6">{size} people</p>
              </div>
            </div>
          </div>
        </div>
  )
}
