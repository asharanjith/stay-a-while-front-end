import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { GoLocation } from 'react-icons/go';
import { BsFillPlayFill, BsHouseFill, BsLifePreserver } from 'react-icons/bs';
import { AiFillLeftCircle, AiFillRightCircle, AiFillStar } from 'react-icons/ai';
import { MdAttachMoney } from 'react-icons/md';
import { fetchHomeStays } from '../HomeSlice';
import style from './Detailed.module.css';

const Detailed = () => {
  const [index, setIndex] = useState(0);
  const { listings } = useSelector((state) => state.home);
  const [listing, setListing] = useState(null);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  let { id } = useParams();
  id = parseInt(id, 10);

  useEffect(() => {
    if (listings.length === 0) {
      dispatch(fetchHomeStays(token));
    }
    const listing = listings.find((listing) => listing.id === id);
    setListing(listing);
  }, [id, listings, token, dispatch]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const ratings = () => {
    const rating = [];
    for (let i = 1; i <= 5; i += 1) {
      if (i <= listing.rating) {
        rating.push(<AiFillStar key={i} className={style.yicon} />);
      } else {
        rating.push(<AiFillStar key={i} className={style.gicon} />);
      }
    }
    return rating;
  };

  return (
    <div className={style.container}>
      {listing ? (
        <>
          <div className={style.slider}>
            <Carousel
              nextIcon={<AiFillRightCircle aria-hidden="true" className={`${style.icon}`} />}
              prevIcon={<AiFillLeftCircle aria-hidden="true" className={`${style.icon}`} />}
              activeIndex={index}
              onSelect={handleSelect}
            >
              {listing.images.map((img) => (
                <Carousel.Item key={img.id}>
                  <img
                    className={style.img}
                    src={img.url}
                    alt="First slide"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className={style.info}>
            <div className={style.title}>
              <h1>{listing.name}</h1>
            </div>
            <div className={style.description}>
              <p>{listing.description}</p>
            </div>
            <div className={style.detailwithIcon}>
              <GoLocation className={style.licon} />
              <p>{listing.location}</p>
            </div>
            <div className={style.detailwithIcon}>
              <BsHouseFill className={style.licon} />
              <p>
                {listing.no_of_rooms}
                {' '}
                Rooms
              </p>
            </div>
            <div className={style.detailwithIcon}>
              {ratings()}
              {' '}
              <p> Rating </p>
            </div>
            <div className={style.detailwithIcon}>
              <p>
                <MdAttachMoney className={style.licon} />
                <strong>
                  {listing.price}
                  {' '}
                  per night
                </strong>
              </p>
            </div>
            <Link to={`/booking/${listing.id}`} className="btn bg-success text-light d-flex g-custom p-2">
              <BsLifePreserver className={style.wicon} />
              Book Now
            </Link>
          </div>
        </>
      ) : (<h1>No Listing Found &#128531;</h1>
      )}
      <Link to="/home" className={style.back}>
        <BsFillPlayFill className={style.bicon} />
      </Link>
    </div>
  );
};

export default Detailed;
