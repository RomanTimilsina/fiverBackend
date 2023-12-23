import React, { useEffect, useState } from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {
  const [imageSrc, setImageSrc] = useState('');
  const [userImg, setUserImg] = useState('');

  const { isLoading, error, data } = useQuery(`${item.userId}`, () =>
  newRequest.get(`/users/${item.userId}`).then((res) => {
    return res.data;
  })
)

  useEffect(() => {
    const downloadImage = () => {
      fetch(`http://localhost:8800/api/uploads/${item.cover}`)
        .then((response) => response.blob())
        .then((blob) => {
          const imageUrl = URL.createObjectURL(blob);
          setImageSrc(imageUrl);
        })
        .catch((error) => console.error('Error fetching image:', error));
    };
  
    downloadImage();
  }, [item]);

  useEffect(() => {
    if (!isLoading) {
      const downloadImage = () => {
        fetch(`http://localhost:8800/api/uploads/${data.img}`)
          .then((response) => response.blob())
          .then((blob) => {
            const imageUrl = URL.createObjectURL(blob);
            console.log(data.userId)
            setUserImg(imageUrl);
            console.log("UserID")
          })
          .catch((error) => console.error('Error fetching image:', error));
      };
  
      downloadImage();
    }

    
  }, [data, isLoading]);

  console.log(item)

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={imageSrc} alt="" />
        <div className="info">
          
          { isLoading ? "loading" :  error ? "error" : 
          (<div className="user">
            <img src={data ? userImg : "man.png"} alt="" />
            <span>{data && data.username}</span>
            </div>
            )
          }

          <p>{item.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>
              {
              !isNaN(item.totalStars / item.starNumber) && Math.round(item.totalStars / item.starNumber)
            }
            </span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {item.price}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
