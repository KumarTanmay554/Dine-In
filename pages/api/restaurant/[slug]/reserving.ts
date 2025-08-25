"use server"

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function reserving({
    bookFname,
    bookLname,
    bookEmail,
    bookPhone,
    bookOccasion,
    bookReq,
    number_of_people,
    slug,
    time,
    date,
    seat_id,
}:{
    bookFname: string;
    bookLname: string;
    bookEmail: string;
    bookPhone: string;
    bookOccasion: string;
    bookReq: string;
    number_of_people: number;
    slug: string;
    time: string;
    date: string;
    seat_id:number[]
}) {

    const restaurant = await prisma.restaurant.findUnique({
        where:{slug},
        select:{
            tables:true,
            id:true,
            open_time:true,
            close_time:true,
        }
    })
    if (!restaurant) {
        throw new Error("Restaurant not found");
    }
    const booking = await prisma.booking.create({
        data:{
            number_of_people: number_of_people,
            booker_first_name: bookFname,
            booker_last_name: bookLname,
            booker_email: bookEmail,
            booker_phone: bookPhone,
            booker_occasion: bookOccasion,
            booker_request: bookReq,
            restaurant_id:restaurant.id,
            booking_time: new Date(`${date}T${time}`) ,
            // booking_time_slot: time,
            
        }
    })
    console.log("Booking created", booking);


    await prisma.bookingOnTables.createMany({
        data:seat_id.map((id)=>({
            booking_id:booking.id,
            table_id:id,
            
        }))
    })

    return{
        data:{
            booking,
        },
    }
}