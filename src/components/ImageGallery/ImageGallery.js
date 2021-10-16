import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';

export default function ImageGallery({ images, onModalClick }) {
  return (
    <ul className={s.ImageGallery}>
      {images.map(el => (
        <li className={s.ImageGalleryItem} key={el.id}>
          <ImageGalleryItem img={el} onOpenModal={onModalClick} />
        </li>
      ))}
    </ul>
  );
}
ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onModalClick: PropTypes.func,
};
