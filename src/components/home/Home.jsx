/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BsFillStarFill } from 'react-icons/bs';
import ReactPaginate from 'react-paginate';
import { fetchHomeStays } from './HomeSlice';
import style from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 6;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const homeStayList = useSelector((state) => state.home.listings);

  useEffect(() => {
    dispatch(fetchHomeStays(token));
  }, [dispatch, token]);
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  useEffect(() => {
    if (homeStayList) {
      setTotalPages(Math.ceil(homeStayList.length / itemsPerPage));
    }
  }, [homeStayList]);

  const errMsg = useSelector((state) => state.home.error);
  const subset = homeStayList.slice(startIndex, endIndex);

  const handleClick = (id) => {
    navigate(`/home/${id}`);
  };

  if (homeStayList) {
    return (
      <div className={style.container}>
        <div className={style.cardContainer}>
          {subset.map((homeStay) => (
            <div
              key={homeStay.id}
              onClick={() => handleClick(homeStay.id)}
              onKeyDown={() => {}}
              role="button"
              tabIndex={homeStay.id}
              className={style.card}
            >
              <div className="card h-100">
                <div className="card-body">
                  {homeStay.images.length > 0
                  && (
                  <img
                    className={style.image}
                    src={homeStay.images[0].url}
                    alt={homeStay.name}
                  />
                  )}
                  <div className="d-flex justify-content-between mt-3">
                    <h4 className="f_size">{homeStay.location}</h4>
                    <h6 className="">
                      <BsFillStarFill />
                      {homeStay.rating}
                    </h6>
                  </div>
                  <h5 className="hse_name">{homeStay.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ReactPaginate
          itemClass="pageitem"
          linkClass="pagelink"
          previousLabel="Prev"
          nextLabel="Next"
          pageCount={totalPages}
          onPageChange={handlePageChange}
          containerClassName="pagination justify-content-center"
          pageClassName="pageitem"
          pageLinkClassName="pagelink"
          activeClassName="active"
          previousClassName="pageitem"
          previousLinkClassName="pagelink"
          nextClassName="pageitem"
          nextLinkClassName="pagelink"
        />
      </div>
    );
  }

  return errMsg;
};
export default Home;
