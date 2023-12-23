import React, { useEffect, useState } from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";

function Gig() {
  const [imageSrc, setImageSrc] = useState([]);
  const [imgArray, setImgArray] = useState([])

  // useEffect(() => {
  //   setImgArray([])
  // },[])

  const { id } = useParams()
  console.log("id:",id)

  const { isLoading, error, data } = useQuery('gig', () =>
  newRequest.get(
    `gigs/single/${id}` 
  )
  .then((res) => {
    console.log("data is here:",res.data)

    setImgArray(res.data.images)
    return res.data;
  })
)

const downloadImage = (img) => {
  fetch(`http://localhost:8800/api/uploads/${img}`)
    .then((response) => response.blob())
    .then((blob) => {
      const imageUrl = URL.createObjectURL(blob);
      setImageSrc(prev => [...prev, imageUrl]);
    })
    .catch((error) => console.error('Error fetching image:', error));
};

// ...

useEffect(() => {
  if (!isLoading) {
    // setImgArray([])
    imgArray.forEach((img) => {
      downloadImage(img);
    });
  }
}, [imgArray, isLoading]);

console.log("data:",imageSrc)

  return (
    <div className="gig">
      <div className="container">
        <div className="left">
          <span className="breadcrumbs">`Liverr {'>'} Graphics & Design {'>'}`</span>
          <h1>{!isLoading && data.title}</h1>
          {isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong!"
          ) : (
             <div className="user">
              <img src={data.img || "/img/noavatar.jpg"} alt="" />
              <span>{data.username}</span>
            </div>
          )}
            <div className="stars">
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <span>5</span>
            </div>
          {(imgArray.length != 0) &&<Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {isLoading ? (
                "loading"
              ) : error ? (
                "error"
              ) : 
              (  
                 imgArray.map((img, index) => (
                  <img key={index} src={imageSrc[index]} alt="" />
                ))
              )
              }
            
            {/* <img
              src="https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <img
              src="https://images.pexels.com/photos/1054777/pexels-photo-1054777.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />  */}
          </Slider>}
          <h2>About This Gig</h2>
          <p>
            I use an AI program to create images based on text prompts. This
            means I can help you to create a vision you have through a textual
            description of your scene without requiring any reference images.
            Some things I've found it often excels at are: Character portraits
            (E.g. a picture to go with your DnD character) Landscapes (E.g.
            wallpapers, illustrations to compliment a story) Logos (E.g. Esports
            team, business, profile picture) You can be as vague or as
            descriptive as you want. Being more vague will allow the AI to be
            more creative which can sometimes result in some amazing images. You
            can also be incredibly precise if you have a clear image of what you
            want in mind. All of the images I create are original and will be
            found nowhere else. If you have any questions you're more than
            welcome to send me a message.
          </p>
          <div className="seller">
            <h2>About The Seller</h2>
            
            <div className="user">
              {/* <img
                src="https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              /> */}
              <div className="info">
                <span>Anna Bell</span>
                <div className="stars">
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <span>5</span>
                </div>
                <button>Contact Me</button>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">{!isLoading && data.title}</span>
                </div>
                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">Aug 2022</span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Last delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p>
              {!isLoading && data.desc}
              </p>
            </div>
          </div>
          <Reviews gigId = {id} />
          </div>
          <div className="right">
          <div className="price">
            <h3>1 AI generated image</h3>
            <h2>$ 59.99</h2>
          </div>
          <p>
            I will create a unique high quality AI generated image based on a
            description that you give me
          </p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="" />
              <span>2 Days Delivery</span>
            </div>
            <div className="item">
              <img src="/img/recycle.png" alt="" />
              <span>3 Revisions</span>
            </div>
          </div>
          <div className="features">
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Prompt writing</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Artwork delivery</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Image upscaling</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Additional design</span>
            </div>
          </div>
          <button>Continue</button>
        </div></div>
        
      </div>
  );
}

export default Gig;
