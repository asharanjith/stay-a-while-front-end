import React, { useState } from 'react';
// import { useDispatch, useSelector } from "react-redux";
import style from './AddHome.module.css';
import Images from './Images';

const AddHome = () => {
  const formInputState = {
    name: '',
    location: '',
    description: '',
    price: '',
    no_of_rooms: '',
    rating: '',
    images: [],
  };
  const [formInput, setformInput] = React.useState(formInputState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformInput({ ...formInput, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted');
    console.log(formInput);
    setformInput(formInputState);
  };

  const handleAdd = () => {
    setformInput({ ...formInput, images: [...formInput.images, ''] });
  };

  const handleRemove = (index) => {
    const images = [...formInput.images];
    images.splice(index, 1);
    setformInput({ ...formInput, images });
  };

  const handleImage = (e, index) => {
    const images = [...formInput.images];
    images[index] = e.target.value;
    setformInput({ ...formInput, images });
  };

  const addHomeForm = () => (
    <>
      <form onSubmit={handleSubmit} className={style.form_container}>
        <input
          type="text"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
          placeholder="Name of the property"
        />
        <input
          type="text"
          name="location"
          value={formInput.location}
          onChange={handleChange}
          required
          placeholder="Location of the property"
        />
        <input
          type="textarea"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
          placeholder="Description of the property"
        />
        <input
          type="number"
          name="price"
          value={formInput.price}
          onChange={handleChange}
          required
          placeholder="Price per day"
        />
        <input
          type="number"
          name="no_of_rooms"
          value={formInput.no_of_rooms}
          onChange={handleChange}
          required
          placeholder="Number of rooms"
        />
        <select
          name="rating"
          onChange={formInput.handleChange}
          required
        >
          <option value="1">1 star</option>
          <option value="2">2 stars</option>
          <option value="3">3 stars</option>
          <option value="4">4 stars</option>
          <option value="5">5 stars</option>
        </select>
        <Images
          form={formInput}
          onAdd={handleAdd}
          onRemove={handleRemove}
          onChange={handleImage}
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  );

  return (
    <section id={style.add_home}>
      {addHomeForm()}
    </section>
  );
};

export default AddHome;
