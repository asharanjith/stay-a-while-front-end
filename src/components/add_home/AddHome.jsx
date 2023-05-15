import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import style from './AddHome.module.css';
import Images from './Images';
import { addHome } from './addHomeSlice';

const AddHome = () => {
  const navigate = useNavigate();

  const formInputState = {
    name: '',
    location: '',
    description: '',
    price: '',
    no_of_rooms: '',
    rating: '1',
    images: [''],
  };
  const [formInput, setformInput] = useState(formInputState);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformInput({ ...formInput, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHome = {
      home_stay: {
        name: formInput.name,
        location: formInput.location,
        description: formInput.description,
        price: formInput.price,
        no_of_rooms: formInput.no_of_rooms,
        rating: formInput.rating,
      },
      images: formInput.images,
    };

    dispatch(addHome(newHome));
    setformInput(formInputState);
    navigate('/');
  };

  const handleAdd = () => {
    setformInput({ ...formInput, images: [...formInput.images, ''] });
  };

  const handleRemove = (index) => {
    const images = [...formInput.images];
    images.splice(index, 1);
    setformInput({ ...formInput, images });
  };

  const handleImageChange = (e, index) => {
    const images = [...formInput.images];
    images[index] = e.target.value;
    setformInput({ ...formInput, images });
  };

  return (
    <section id={style.add_home}>
      <form onSubmit={handleSubmit} className={style.form_container}>
        <input
          type="text"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
          placeholder="Name of the property"
          minLength={3}
        />
        <input
          type="text"
          name="location"
          value={formInput.location}
          onChange={handleChange}
          required
          placeholder="Location of the property"
          minLength={3}
        />
        <textarea
          type="textarea"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
          placeholder="Description of the property"
          minLength={3}
          maxLength={1000}
          rows="7"
          cols="60"
        />
        <input
          type="number"
          name="price"
          value={formInput.price}
          onChange={handleChange}
          required
          placeholder="Price per day"
          min={1}
        />
        <input
          type="number"
          name="no_of_rooms"
          value={formInput.no_of_rooms}
          onChange={handleChange}
          required
          placeholder="Number of rooms"
          min={1}
        />
        <select
          name="rating"
          value={formInput.rating}
          onChange={handleChange}
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
          onChange={handleImageChange}
        />
        <input type="submit" value="Submit" className={style.submission} />
      </form>
    </section>
  );
};

export default AddHome;
