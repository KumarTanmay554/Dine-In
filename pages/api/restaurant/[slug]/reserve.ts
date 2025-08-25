"use server";

import { PrismaClient } from "@prisma/client";
import availability from "./availability";

const prisma = new PrismaClient();

export default async function reserve({
  slug,
  day,
  time,
  size,
}: {
  slug: string;
  day: string;
  time: string;
  size: string;
}) {
  try {
    if (!slug || !day || !time || !size) {
      throw new Error("Invalid request all not present");
    }
    console.log("hello");
    console.log("Reserving for", { slug, day, time, size });

    const restaurant = await prisma.restaurant.findUnique({
      where: { slug },
    });
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    // console.log("Found restaurant", restaurant);
    if (
      new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
      new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)
    ) {
      throw new Error("Invalid time for reservation");
    }

    const availRes = await availability({
        slug,day,time,size
    })
    if(!availRes || !availRes.data?.availability) {
      throw new Error("No available slots for this reservation");
    }
    console.log("avail res",availRes);

    // tableSize:id
    const tableCount :{
      2:number[];
      4:number[];
    }={
      2: [],
      4: [],
    }
    availRes.data.tables.forEach((i=>{
      if(i.seats === 2){
        tableCount[2].push(i.id);
      }else{
        tableCount[4].push(i.id);
      }
    }))

    console.log("tabelcount",tableCount)
    
   const tableToBook:number[]=[];
   let seatsRemain = parseInt(size);

   while(seatsRemain>0){
    if(seatsRemain >=3){
      if(tableCount[4].length > 0){
        tableToBook.push(tableCount[4][0]);
        tableCount[4].shift();
        seatsRemain -= 4;
      }else{
        tableToBook.push(tableCount[2][0]);
        tableCount[2].shift();
        seatsRemain -= 2;
      }
    }else{
      if(tableCount[2].length > 0){
        tableToBook.push(tableCount[2][0]);
        tableCount[2].shift();
        seatsRemain -= 2;
      }else{
        tableToBook.push(tableCount[4][0]);
        tableCount[4].shift();
        seatsRemain -= 4;
      }
    }
   }
   console.log("table to book",tableToBook);

    return {
      slug,
      day,
      time,
      size,
      tableCount,
      tableToBook,
      availRes,
    };
  } catch (error) {
    console.error("Error in reservation:", error);
  }
}
