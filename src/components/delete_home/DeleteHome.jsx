import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { getHomeStays } from './deleteHomeSlice';
import DeleteCard from './deleteCard';
import style from './DeleteHome.module.css';

const DeleteHome = () => {
  const dispatch = useDispatch();
  const { homeStayData, loading } = useSelector((state) => state.deleteHome);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 6;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  useEffect(() => {
    dispatch(getHomeStays());
  },
  [dispatch]);

  useEffect(() => {
    if (homeStayData) {
      setTotalPages(Math.ceil(homeStayData.length / itemsPerPage));
    }
  }, [homeStayData]);

  const subset = homeStayData.slice(startIndex, endIndex);

  return (
    <div className={style.container}>
      <div className={style.cardContainer}>
        {loading && (
        <>
          <div className="loader align-self-center fixed-center-screen" />
        </>
        )}
        {homeStayData.length > 0 ? (
          subset.map((item) => (
            <DeleteCard item={item} key={item.id} />
          ))
        ) : (
          <h1>No homes to display</h1>
        )}
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
};

export default DeleteHome;
