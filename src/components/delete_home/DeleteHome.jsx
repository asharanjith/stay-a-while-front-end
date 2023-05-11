import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeStays } from './deleteHomeSlice';
import DeleteCard from './deleteCard';
import './deleteHome.css';

const DeleteHome = () => {
  const dispatch = useDispatch();
  const { homeStayData, loading } = useSelector((state) => state.deleteHome);

  useEffect(() => {
    dispatch(getHomeStays());
  },
  [dispatch]);

  return (
    <div className="d-flex  justify-content-center flex-wrap cardContainer pt-5">
      {loading && (
      <>
        <div className="loader align-self-center" />
      </>
      )}
      {homeStayData.length > 0 ? (
        homeStayData.map((item) => (
          <DeleteCard item={item} key={item.id} />
        ))
      ) : (
        <h1>No homes to display</h1>
      )}
    </div>
  );
};

export default DeleteHome;
