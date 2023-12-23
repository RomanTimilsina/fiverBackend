import React from 'react'
import "./Reviews.scss"
import Review from '../review/Review.jsx'

const Reviews = ({gigId}) => {


  const { isLoading, error, data } = useQuery('reviews', () =>
  newRequest.get(
    `reviews/${gigId}` 
  )
  .then((res) => {
    console.log("data is here:",res.data)
    return res.data;
  })
)

  return (
    <div className="reviews">
      {isLoading ? "loading" : (error ? "error" : data.map(review => <Review key={review._id} review = {review} />))}
     </div>
  )
}

export default Reviews
