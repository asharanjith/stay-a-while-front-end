import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteHome, getHomeStays } from './deleteHomeSlice';

const DeleteHome = () => {
  const dispatch = useDispatch();
  const { homeStayData, loading } = useSelector((state) => state.deleteHome);

  useEffect(() => {
    dispatch(getHomeStays());
  },
  [dispatch]);
console.log(homeStayData);
  return (
    <div>
      {loading && <p>Loading...</p>}
      {homeStayData && <p>{homeStayData}</p>}
    </div>
  );
};

export default DeleteHome;
