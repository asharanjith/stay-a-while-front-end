import React from 'react';
import PropTypes from 'prop-types';
import styles from './AddHome.module.css';

const Images = ({
  form, onAdd, onRemove, onChange,
}) => (
  <>
    <div className={styles.imageContainer}>
        <div className={styles.imageHeading}>
      <h4>
        Add images of the property:
        <button type="button" onClick={() => onAdd()} className={styles.imageButton}><i className="bi bi-file-earmark-plus" /></button>
      </h4></div>
      {form.images.map((image, index) => (
        <div key={index} className={styles.image_container}>
          <input
            type="text"
            name="image"
            value={image}
            onChange={(e) => onChange(e, index)}
            required
            placeholder="Image URL"
          />
          <button type="button" onClick={() => onRemove(index)}><i className="bi bi-file-earmark-minus" /></button>
        </div>
      ))}
    </div>

  </>
);

Images.propTypes = {
  form: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Images;
