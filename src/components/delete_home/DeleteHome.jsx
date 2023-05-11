import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeStays } from './deleteHomeSlice';
import DeleteCard from './deleteCard';

const DeleteHome = () => {
  const dispatch = useDispatch();
  const { homeStayData, loading } = useSelector((state) => state.deleteHome);

  useEffect(() => {
    dispatch(getHomeStays());
  },
  [dispatch]);
  // console.log(homeStayData);

  return (
    <div>
      <h1>Delete Home</h1>
      {loading && <h3>Loading...</h3>}
      {homeStayData.map((item) => (
        <DeleteCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default DeleteHome;
