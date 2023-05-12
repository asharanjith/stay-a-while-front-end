/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { BsFillStarFill } from 'react-icons/bs';
import { fetchHomeStays } from './HomeSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    dispatch(fetchHomeStays(token));
  }, [dispatch, token]);

  const homeStayList = useSelector((state) => state.home.listings);
  const errMsg = useSelector((state) => state.home.error);

  const handleClick = (id) => {
    navigate(`/home/${id}`);
  };

  const imgSlide = (homeStay) => (
    <div
      id={`carouselExampleCaptions-${homeStay.id}`}
      className="carousel slide"
    >
      <div className="carousel-indicators">
        {homeStay.images.map((img, index) => (
          <button
            key={uuidv4()}
            type="button"
            data-bs-target={`#carouselExampleCaptions-${homeStay.id}`}
            data-bs-slide-to={index}
            className={index === 0 ? 'active' : ''}
            aria-current={index === 0 ? 'true' : ''}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
      <div className="carousel-inner">
        {homeStay.images.map((img, index) => (
          <div
            key={uuidv4()}
            className={`carousel-item img-holder ${
              index === 0 ? 'active' : ''
            }`}
          >
            <img
              src={img.url}
              className="d-block w-100 img-tag"
              alt={`Slide ${index + 1}`}
              onClick={() => handleClick(homeStay.id)}
              onKeyDown={() => {}}
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#carouselExampleCaptions-${homeStay.id}`}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={`#carouselExampleCaptions-${homeStay.id}`}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );

  if (homeStayList) {
    return (
      <div className="container mt-5">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xlg-4 g-3">
          {homeStayList.map((homeStay) => (
            <div key={homeStay.id} className="col">
              <div className="card h-100">
                <div className="card-body">
                  {imgSlide({ id: homeStay.id, images: homeStay.images })}
                  <div className="d-flex justify-content-between mt-3">
                    <h4 className="f_size">{homeStay.location}</h4>
                    <h6 className="">
                      <BsFillStarFill />
                      {homeStay.rating}
                      .0
                    </h6>
                  </div>
                  <h5 className="hse_name fs-9">{homeStay.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return errMsg;
};
export default Home;
