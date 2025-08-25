import Header from "./components/Header";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import ReservationCard from "./components/ReservationCard";
import { PrismaClient, Review } from "@prisma/client";

const prisma = new PrismaClient();

interface Restaurant{
  id: number,
  name: string,
  image: string[],
  description: string,
  slug: string,
  reviews: Review[],
  open_time: string,
  close_time: string,
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant>=> {
  const restaurant = await prisma.restaurant.findUnique({
    where:{
      slug
    },
    select:{
      id: true,
      name: true,
      image: true,
      description: true,
      slug: true,
      reviews: true,
      open_time:true,
      close_time:true
    }
  })
  if(!restaurant){
    throw new Error("Restaurant not found");
  }
  return restaurant;
}

export default async function RestaurantDetails({params,}: {params:{slug: string}}){
  const restaurant = await fetchRestaurantBySlug(params.slug);
  // console.log({restaurant});
    return(
        <>

      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug}/>
        <Title name={restaurant.name}/>
        <Rating reviews = {restaurant.reviews}/>
        <Description description={restaurant.description}/>
        <Images image={restaurant.image}/>
        <Reviews reviews={restaurant.reviews} />
      </div>
      <div className="w-[27%] sticky top-0 text-reg">
        <ReservationCard openingHours={restaurant.open_time} closingHours={restaurant.close_time} slug={restaurant.slug} />
      </div>
    </>

    )
}