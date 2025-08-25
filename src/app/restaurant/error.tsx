"use client"
import Image from 'next/image'
import React from 'react'
import errorImg from "../../../public/error.png"
export default function Error({error}:{error:Error}) {
    // console.log(error.message)
    return (
    <div className="h-screen bg-grey-200 flex flex-col justify-center items-center">
        <Image src={errorImg} alt='error' className='w-56 mb-8'/>
        <div className="bg-white px-9 py-14 shadow rounded">
            <h3 className='text-3xl font-bold'>Something Went Wrong</h3>
            <p className='text-reg font-bold'> {error.message}</p>
            <p className="mt-6 text-sm font-light">An Error Occured</p>
        </div>
    </div>
  )
}
