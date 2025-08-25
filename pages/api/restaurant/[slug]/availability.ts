"use server";
import { PrismaClient } from "@prisma/client";
import { times } from "../../../../BookingSize";
// import { date } from "zod";

const prisma = new PrismaClient();

export default async function availability({
  slug,
  day,
  time,
  size,
}: // openingHours,
// closingHours,
{
  slug: string;
  day: string;
  time: string;
  size: string;
  // openingHours: string;
  // closingHours: string;
}) {
  try {
    if (!slug || !day || !time || !size) {
      console.log({ slug, day, time, size });
      console.error("Invalid request all not present");
      throw new Error("Invalid request all not present");
      // return res.status(400).json({error: "Invalid request"})
    }
    const searchTimes = times.find((i) => {
      return i.time === time;
    })?.searchTimes;

    if (!searchTimes) {
      console.error("Invalid request search times");
      throw new Error("Invalid request search times");
    }
    // console.log("found searchtimes", searchTimes);

    // const validTiming = searchTimes.find((i) => {
    //   const timeDate = new Date(`${day}T${i}`);
    //   const opening = new Date(`${day}T${openingHours}`);
    //   const closing = new Date(`${day}T${closingHours}`);
    //   return timeDate >= opening && timeDate <= closing;
    // });
    // console.log("valid timing", validTiming);

    // Query on bookings on that day and valid searchtimes
    const book = await prisma.booking.findMany({
      where: {
        booking_time: {
          gte: new Date(`${day}T${searchTimes[0]}`),
          lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
        },
      },
      select: {
        booking_time: true,
        number_of_people: true,
        tables: true,
      },
    });
    console.log("here are the bookings", book);

    // booked table with timing and table ids
    const bookedTablesObj: { [key: string]: { [key: number]: true } } = {};
    
    book.forEach((i) => {
      bookedTablesObj[i.booking_time.toISOString()] = i.tables.reduce(
        ( acc,table) => {
          return {
            ...acc,
            [table.table_id]: true,
          };
        },{}
      );
    });
    console.log("book table obj",bookedTablesObj)

    // tables in a restaurant
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        slug,
      },
      select: {
        tables: true,
        open_time: true,
        close_time: true,
      },
    });
    if (!restaurant) {
      console.error("Invalid request restaurant");
      throw new Error("Invalid request");
    }
    // console.log("here are the tables", restaurant.tables);

    const tables = restaurant.tables;

    // table on basis of time
    const tableTiming = searchTimes.map(i => {
      return {
        date: new Date(`${day}T${i}`),
        time: i,
        tables,
      };
    });

    // remaining tables in that search time in that restaurant
    tableTiming.forEach((i) => {
      i.tables = i.tables.filter((table) => {
        if (bookedTablesObj[i.date.toISOString()]) {
          if (bookedTablesObj[i.date.toISOString()][table.id]) {
            return false;
          }
        }
        return true;
        // return !availableTableObj[i.day.toISOString()][table.table_id]
      });
    });
    console.log("table tininigne",tableTiming)
    console.log(tableTiming.map((i)=>{
      return{
        tables: i.tables.map((table) => {
          return {
            id: table.id,
            seats: table.seats,
          };
        }),
      }
    }))

    // availability of chairs for each time slot
    const availability = tableTiming
      .map((i) => {
        const sumSeats = i.tables.reduce((sum, table) => {
          return sum + table.seats;
        }, 0);
        return {
          time: i.time,
          chairs: sumSeats >= parseInt(size),
        };
      })
      .filter((i) => {
        const timeAfterOpening =
          new Date(`${day}T${i.time}`) >=
          new Date(`${day}T${restaurant.open_time}`);
        const timeBeforeClosing =
          new Date(`${day}T${i.time}`) <=
          new Date(`${day}T${restaurant.close_time}`);
        // console.log("first")
        return timeAfterOpening && timeBeforeClosing;
      });

    return {
      data: {
        // slug,
        // day,
        // time,
        // size,
        // searchTimes,
        book,
        bookedTablesObj,
        tables,
        tableTiming,
        availability,
      },
    };
  } catch (error: any) {
    return { error };
  }

  //   return res.status(200).json({slug,day,time,size})
}
