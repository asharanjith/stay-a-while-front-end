import React, { useState } from 'react';
// import { useDispatch, useSelector } from "react-redux";

const AddHome = () => {
  const formInputState = {
    name: '',
    location: '',
    description: '',
    price: '',
    no_of_rooms: '',
    rating: '',
    images: '',
  };
  const [formInput, setformInput] = React.useState(formInputState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformInput({ ...formInput, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted');
    console.log(e);
    setformInput(formInputState);
  };

  const addHomeForm = () => (
    <>
      <h1>Add Home</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="location">
          Address:
          <input
            type="text"
            name="location"
            value={formInput.location}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="description">
          Please provide a short description about the property:
          <input
            type="text"
            name="description"
            value={formInput.description}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="price">
          Price per day:
          <input
            type="number"
            name="price"
            value={formInput.price}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="no_of_rooms">
          Number of rooms:
          <input
            type="number"
            name="no_of_rooms"
            value={formInput.no_of_rooms}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="rating">
          Rating:
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
        </label>
        <label htmlFor="images">
          Images:
          <input
            type="file"
            name="images"
            value={formInput.images}
            onChange={handleChange}
            required
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  );

  return (
    <section id="add_home">
      <div className="form_container">
        {addHomeForm()}
      </div>
    </section>
  );
};

export default AddHome;
