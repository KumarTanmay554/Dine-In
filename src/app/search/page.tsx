
import Header from "./components/Header"
import SearchSideBar from "./components/SearchSideBar"
import RestaurantCard from "./components/RestaurantCar"
import { PRICE, PrismaClient, } from "@prisma/client"

const prisms = new PrismaClient();

interface SearchParams{ city?:string, cuisine?:string, price?:PRICE };


const fetchRestaurants = async (searchParams:SearchParams)=>{
  const where:any={};

  if(searchParams.city){
    const location = {
      name:{
        equals:searchParams.city.toLowerCase()
      }
    }
    where.location = location;
  }

  if(searchParams.cuisine){
    const cuisine = {
      name:{
        equals:searchParams.cuisine.toLowerCase()
      }
    }
    where.cuisine = cuisine;
  }

  if(searchParams.price){
      const price = {
        equals:searchParams.price
      }
      where.price = price;
    }
  
  const select = {
    id:true,
    name:true,
    main_image:true,
    price:true,
    location:true,
    cuisine:true,
    slug:true,
    reviews:true,
    
  }
 
  const restaurants = await prisms.restaurant.findMany({
    where,
    select,
  })
  return restaurants;
}

const fetchlocation = async()=>{
  return await prisms.location.findMany();
}
const fetchcuisine = async()=>{
  return await prisms.cuisine.findMany();
}
export default async function Search({searchParams}:{searchParams:SearchParams}){
  const restaurants = await fetchRestaurants(searchParams);
  // console.log({restaurants});
  const locations = await fetchlocation();
  const cuisines = await fetchcuisine();
    return(
        <>
            <Header/>
            <div className="flex py-4 m-auto w-2/3 justify-between items-start">
              <SearchSideBar location={locations} cuisine={cuisines} searchParams={searchParams}/>
              <div className="w-5/6">
                {restaurants.length ?<> {restaurants.map((restaurant)=>(
                  <RestaurantCard restaurant={restaurant} key={restaurant.id}/>
                ))}</> : <p>No Restaurants Found</p>}
              </div>
            </div>
            </>
    )
}