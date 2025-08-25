
import Header from "../components/Header"
import RestaurantNavBar from "../components/RestaurantNavBar"
import Menus from "../components/Menus"
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const fetchMenu = async(slug:string)=>{
  const restaurant = await prisma.restaurant.findUnique({
    where:{
      slug
    },
    select:{
      items:true,
    }
  })
  if(!restaurant){
    throw new Error("Menu not found");
  }
  return restaurant.items;
}

export default async function Menu({params}: {params:{slug: string}}){
  const menu = await fetchMenu(params.slug);
    return(
        <>
    
      <div className="bg-white w-[100%] rounded p-3 shadow">

        <RestaurantNavBar slug={params.slug}/>
        <Menus menu={menu}/>

      </div>

    </>
    )
}