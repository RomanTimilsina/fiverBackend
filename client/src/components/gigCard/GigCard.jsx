import React, { useEffect, useState } from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";

const GigCard = ({ item }) => {
  const [imageSrc, setImageSrc] = useState('');

  console.log(item.cover)
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

  return (
    <Link to="/gig/123" className="link">
      <div className="gigCard">
        <img src={imageSrc} alt="" />
        <div className="info">
          <div className="user">
            <img src={item.pp} alt="" />
            <span>{item.username}</span>
          </div>
          <p>{item.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>{item.star}</span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {item.price}
              <sup>99</sup>
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
