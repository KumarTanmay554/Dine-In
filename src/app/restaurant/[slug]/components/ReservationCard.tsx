"use client"
import React, { useEffect, useState } from 'react'
import {BookingSize, convertToDisplayTime, times} from '../../../../../BookingSize';
import availability from '../../../../../pages/api/restaurant/[slug]/availability';
import Link from 'next/link';
import reserve from '../../../../../pages/api/restaurant/[slug]/reserve';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';

export default function ReservationCard({
  openingHours,closingHours,slug
}:{openingHours:string,closingHours:string, slug:string}) {

  const router = useRouter();
  const [date,setDate] = useState<Date | null>(new Date());
  const [size,setSize] = useState<number>(BookingSize[0]?.value||1);
  const [selectedTime,setSelectedTime] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [seatid,setSeatId] = useState<number[]>([]);

  const handleDateChange = (date: Date | null)=>{
    if(date){
      return setDate(date)
    }
    return setDate(null)
  }

  // availability check
  const handleFindTime = async ()=>{
    setLoading(true);
    setError("");
    try {
      if(!date || !selectedTime){
        setError("Please enter correct details");
        console.log("enter correct detail");
        return;
      }
      const day = date.toISOString().split("T")[0];
      const {data,error} = await availability({slug,day,time:selectedTime,size:size.toString()});

      console.log("data is here",data);

      setResult(data);

      if(error){
        setError(error?.message??error?.error??error);
        return;
      }
    } catch (error:any) {
      setError(error?.message??error?.error??error);
    }finally{
      setLoading(false);
    }
    // if(!date || !selectedTime){
    //   console.log("enter correct detail")
    //   return;
    // }
    // const day = date.toISOString().split("T")[0];
    // const queryParams = new URLSearchParams({
    //   day,
    //   time: selectedTime,
    //   size: size.toString()
    // });
    // // http://localhost:3000/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2024-03-03&time=02:00:00.000Z&
    // const url = `http://localhost:3000/api/restaurant${slug}/availability?${queryParams.toString()}`
    // try{
    //   const res = await fetch(url);
    //   const data = await res.json();
    //   console.log(data);
    // }catch(e){
    //   console.log(e);
    // }
    // const data = await availability({slug,day:date.toISOString().split("T")[0],time:selectedTime,size:size.toString()});
    // console.log("data are", data);
  }
  useEffect(()=>{
    // console.log("Resekhfb",result)
    console.log("day", date?.toISOString().split("T")[0]);
  },[])

  const filterTime = ()=>{
    const window: typeof times = [];
    let flag = false;
    times.forEach(i=>{
      if(i.time === openingHours){
        flag = true
      }
      if(flag){
        window.push(i)
      }
      if(i.time === closingHours){
        flag = false
      }
    })
    return window;
    
  }
  const handleReserve = async()=>{
    setLoading(true);
    try {
      if(!date || !selectedTime){
        setError("Please enter correct details");
        return;
      }
      const day = date.toISOString().split("T")[0];
      const reserveRes = await reserve({slug, day,time:selectedTime,size:size.toString()})
      console.log(reserveRes)
      const tableToReserve = reserveRes?.tableToBook;
      if(!tableToReserve){
        throw("No table available for this time");
      }
      setSeatId(tableToReserve)
      router.push(`/reserve/${slug}?size=${size.toString()}&time=${selectedTime}&day=${day}&seatid=${tableToReserve.join(",")}`)
    } catch (error) {
      console.error("Error reserving table:", error);
    }
  }
  useEffect(()=>{
    console.log(seatid)
  },[])
  return (
    <div className="fixed w-[19%] bg-white rounded p-3 shadow">
          <div className="text-center border-b pb-2 font-bold">
            <h4 className="mr-7 text-lg">Make a Reservation </h4>
          </div>

          <div className="my-3 flex flex-col">
            <label htmlFor="">Party size</label>
            <select name="" className="py-3 border-b font-light cursor-pointer" id="" onChange={(e)=>setSize(parseInt(e.target.value))}>
              {BookingSize.map((i)=>{
                return <option key={i.value} value={i.value}>{i.label}</option>
              })}
            </select>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col w-[48%]">
              <label htmlFor="">Date</label>
              <input type="date" onChange={(e) => handleDateChange(e.target.value ? new Date(e.target.value) : null)} className="py-3 border-b font-light w-30 cursor-pointer" />
            </div>

            <div className="flex flex-col w-[48%]">
              <label htmlFor="">Time</label>
              <select name="" id="" className="py-3 border-b font-light cursor-pointer" value={selectedTime} onChange={(e)=>setSelectedTime(e.target.value)}>
                {/* todo */}
                {/* <option value="">7:30 AM</option>
                <option value="">9:30 AM</option> */}
                {filterTime().map(i=>(
                  <option key={i.time} value={i.time}>{i.displayTime}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5">
            <button onClick={handleFindTime} 
            disabled={loading}
              className="bg-red-600 rounded w-full px-4 text-white font-bold h-16 cursor-pointer"
            >
              {loading? "Loading...":"Find a Time"}
            </button>
          </div>
          {result && result.availability ? (
            <div className="mt-4">
              <p className="text-reg">Select a Time</p>
              <div className="flex flex-wrap mt-2">
                {result.availability.map((i:any)=>{
                  return i.chairs ? (<Link href={`/reserve/${slug}`} onClick={handleReserve} className='bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3'>
                    <p className="text-sm font-bold">
                      {convertToDisplayTime(i.time)}
                    </p>
                  </Link>):(<p className='bg-gray-400 p-2 w-24 mb-3 rounded mr-3 text-black'></p>)
                })}
              </div>
            </div>
          ):null}
        </div>
  )
}
