"use client"
import Image from 'next/image'
import React from 'react'
import fullstar from "../../../public/full-star.png"
import halfstar from "../../../public/half-star.png"
import emptystar from "../../../public/empty-star.png"
import errorpic from "../../../public/error.png"
import { Review } from '@prisma/client'
import { avgRating } from '../../../utils/avgRating'



export default function Stars({reviews,rate}:{reviews:Review[],rate?:number}) {
    const rating = rate || avgRating(reviews)
    const star=()=>{
        const st =[];

        for(let i=0;i<5;i++){
            const diff = parseFloat((rating-i).toFixed(1))
            if(diff>=1){
                st.push(fullstar)
            }
            else if(diff<1 && diff>0){
                if(diff<=0.2) st.push(emptystar)
                else if(diff>0.2 && diff<=0.6) st.push(halfstar)
                else st.push(fullstar)
            }
            else st.push(emptystar)

        }
        return st.map((s,idx)=>{
            return(
                <Image key={idx} src={s} alt='' className='w-4 h-4 mr-2'/>
            )
        })
    }
    return <div className='flex items-center'>{star()}</div>

}
