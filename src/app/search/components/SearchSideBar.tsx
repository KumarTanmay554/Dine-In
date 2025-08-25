import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";

export default function SearchSideBar({location,cuisine,searchParams}:{location:Location[];cuisine:Cuisine[];searchParams:{city?:string, cuisine?:string, price?:PRICE}}){
    return(
        <div className="w-1/5">
        <div className="border-b pb-4 flex flex-col">
          <h1 className="mb-2">Region</h1>
          {location.map(location=>(
            <Link href={{
              pathname: '/search',
              query: {...searchParams,city: location.name}
            }} className="font-light text-reg capitalize" key={location.id}>{location.name}</Link>
          ))}
          {/* <p className="font-light text-reg">Toronto</p>
          <p className="font-light text-reg">Ottawa</p>
          <p className="font-light text-reg">Montreal</p>
          <p className="font-light text-reg">Hamilton</p>
          <p className="font-light text-reg">Kingston</p>
          <p className="font-light text-reg">Niagara</p> */}
        </div>
        <div className="border-b pb-4 mt-3 flex flex-col">
          <h1 className="mb-2">Cuisine</h1>
          {cuisine.map(cuisine=>(
            <Link href={{
              pathname: '/search',
              query: {
                ...searchParams,
                cuisine: cuisine.name}
            }} className="font-light text-reg capitalize" key={cuisine.id}>{cuisine.name}</Link>
          ))}
          {/* <p className="font-light text-reg">Mexican</p>
          <p className="font-light text-reg">Italian</p>
          <p className="font-light text-reg">Chinese</p> */}
        </div>
        <div className="mt-3 pb-4">
          <h1 className="mb-2">Price</h1>
          <div className="flex">
            <Link href={{
              pathname: '/search',
              query: {
                ...searchParams,
                price: PRICE.CHEAP, 
              }
            }} className="border w-full text-reg text-center font-light rounded-l p-2">
              $
            </Link>
            <Link href={{
              pathname: '/search',
              query: {
                ...searchParams,
                price: PRICE.REGULAR,
              }
            }}
              className="border-r border-t border-b w-full text-reg text-center font-light p-2"
            >
              $$
            </Link>
            <Link href={{
              pathname: '/search',
              query: {
                ...searchParams,
                price: PRICE.EXPENSIVE,
              }
            }}
              className="border-r border-t border-b w-full text-reg text-center font-light p-2 rounded-r"
            >
              $$$
            </Link>
          </div>
        </div>
      </div>
    )
}