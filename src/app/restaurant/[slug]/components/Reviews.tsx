import { Review } from "@prisma/client"
import ReviewCard from "./ReviewCard"

function Reviews({reviews}:{reviews:Review[]}) {
  return (
    <div>
          <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
            What {reviews.length} {reviews.length === 1 ?"person":"people"} are saying
          </h1>
          <div>
            {/* REVIEW CARD */}
            {reviews.length ? (
              <div className="flex flex-wrap justify-between">
              {reviews.map(review=>(
                  <ReviewCard key={review.id} review={review}/>
              ))}
          </div>
          ):
          (<div className='flex flex-wrap justify-between'>
              <p>No Review. Be first</p>
          </div>)}
            {/* REVIEW CARD */}
          </div>
        </div>
  )
}

export default Reviews
