import React, { useRef, useState } from "react";
import "./Gigs.scss";
// import { gigs } from "../../data";
import GigCard from "../../components/gigCard/GigCard";
import newRequest from "../../utils/newRequest";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const location = useLocation()

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const { isLoading, error, data, refetch } = useQuery('repoData', () =>
  newRequest.get(`/gigs${location.search}&min=${minRef.current.value}&max=${maxRef.current.value}`).then((res) => {
    return res.data;
  })
)

  const apply = ()=>{
    refetch()
  }

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">`Liverr {'>'} Graphics & Design {'>'}`</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Liverr's AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                  )}
                  <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
                  {isLoading ? "loading" :
            error ? "error" :
            data.map((gig) => (
              <React.Fragment key={gig._id}>
                <GigCard item={gig} />
                {console.log("data:",gig)}
              </React.Fragment>
            ))
          }

        </div>
      </div>
    </div>
  );
}

export default Gigs;
