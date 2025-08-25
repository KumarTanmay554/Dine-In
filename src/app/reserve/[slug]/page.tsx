import Header from "./components/Header"
import Form from "./components/Form"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
const fetchRestaurantBySlug = async (slug:string)=>{
  const restaurant = await prisma.restaurant.findUnique({
    where :{slug},
  })
  if(!restaurant){
    console.log("hohohoho")
  }
  return restaurant;
}

export default async function Reserve({
  params,
}:{params:{slug:string}}){

  const restaurant = await fetchRestaurantBySlug(params.slug)
  if (!restaurant) {
      return <div>Restaurant not found</div>
  }

    return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <Header image={restaurant.main_image} name={restaurant?.name ?? ""}/>
        <Form/>
      </div>
    </div> 
    )
}